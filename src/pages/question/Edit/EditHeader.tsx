import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Space, Typography, Input, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changePageTitle } from "../../../store/pageInfoReducer";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { updateQuestionService } from "../../../services/question";
import { useKeyPress, useRequest, useDebounceEffect } from "ahooks";
import { QUESTION_STAT_PATHNAME } from "../../../router";

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
  const { componentList } = useGetComponentInfo();

  const { run: saveAction, loading } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
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
      saveAction();
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
    <Button
      type="primary"
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
      onClick={publishAction}
    >
      发布
    </Button>
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
