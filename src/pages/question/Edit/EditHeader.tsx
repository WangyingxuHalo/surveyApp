import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Space, Typography, Input, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changePageTitle } from "../../../store/pageInfoReducer";
import {
  reorderComponents,
  clearCreateAndDeleteIds,
} from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  updateQuestionService,
  saveQuestionService,
} from "../../../services/question";
import { useKeyPress, useRequest, useDebounceEffect } from "ahooks";
import { QUESTION_STAT_PATHNAME } from "../../../router";
import cloneDeep from "lodash.clonedeep";
import { setIsUser } from "../../../store/userActionReducer";

const { Title } = Typography;

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) {
      return;
    }
    dispatch(changePageTitle(newTitle));
    dispatch(setIsUser(true));
  };
  return (
    <Space>
      {editState ? (
        <Input
          value={title}
          onBlur={() => {
            setEditState(false);
          }}
          onPressEnter={() => {
            setEditState(false);
          }}
          onChange={handleChange}
        />
      ) : (
        <Title>{title}</Title>
      )}
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setEditState(true)}
      />
    </Space>
  );
};

const SaveButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { createIds, componentList, deleteIds, isUserAction } =
    useGetComponentInfo();
  const dispatch = useDispatch();

  const { run: saveAction, loading } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      const copiedComponentList = cloneDeep(componentList);
      // // Re-organize their order
      copiedComponentList.forEach((eachComp, index) => {
        const { order } = eachComp;
        if (order !== index) {
          eachComp.order = index;
        }
      });

      dispatch(reorderComponents(copiedComponentList));
      dispatch(setIsUser(true));

      const newIds = await saveQuestionService(id, {
        ...pageInfo,
        createIds,
        componentList: copiedComponentList,
        deleteIds,
      });
      return newIds;
    },
    {
      manual: true,
      onSuccess() {
        dispatch(clearCreateAndDeleteIds());
      },
    }
  );

  // save manually
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (loading) return;
    saveAction();
  });

  // save automatically with debounce
  useDebounceEffect(
    () => {
      if (isUserAction) {
        saveAction();
        // after save successfully, set isUser to false
        // to avoid trigger infinite loop
        dispatch(setIsUser(false));
      }
    },
    [componentList, pageInfo],
    { wait: 1000 }
  );

  return (
    <Button
      onClick={saveAction}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { isPublished = false } = pageInfo;
  const { componentList } = useGetComponentInfo();
  const nav = useNavigate();

  const { run: publishAction, loading } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功");
        nav(`${QUESTION_STAT_PATHNAME}/${id}`);
      },
    }
  );
  return (
    <div>
      {isPublished ? (
        <Button
          type="primary"
          onClick={() => nav(`${QUESTION_STAT_PATHNAME}/${id}`)}
        >
          问卷统计页面
        </Button>
      ) : (
        <Button
          type="primary"
          disabled={loading}
          icon={loading ? <LoadingOutlined /> : null}
          onClick={publishAction}
        >
          发布
        </Button>
      )}
    </div>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
