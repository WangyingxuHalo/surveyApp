import React, { FC, useState } from "react";
import styles from "./QuestionCard.module.scss";
import { Space, Button, Divider, Tag, Modal, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from "../router";
import {
  duplicateQuestionService,
  updateQuestionService,
} from "../services/question";
import { useRequest } from "ahooks";

const { confirm } = Modal;

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props;

  const [isStarState, setIsStarState] = useState(isStar);
  const [isDeletedState, setIsDeletedState] = useState(false);

  const { run: updateStar, loading: updateStarLoading } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, {
        isStar: !isStarState,
      });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("更新成功");
      },
    }
  );

  const { loading: duplicateLoading, run: duplicateSurvey } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`${QUESTION_EDIT_PATHNAME}/${result.id}`);
      },
    }
  );

  const { loading: deleteLoading, run: deleteSurvey } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    }
  );

  const handleClickEdit = () => {
    const nav_link = `${QUESTION_EDIT_PATHNAME}/${_id}`;
    nav(nav_link);
  };

  const handleClickStats = () => {
    const nav_link = `${QUESTION_STAT_PATHNAME}/${_id}`;
    nav(nav_link);
  };

  const handleDuplicate = () => {
    confirm({
      title: "确定复制该问卷?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => duplicateSurvey(),
    });
  };

  const handleDelete = () => {
    confirm({
      title: "确定删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => deleteSurvey(),
    });
  };

  if (isDeletedState) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished
                  ? `${QUESTION_STAT_PATHNAME}/${_id}`
                  : `${QUESTION_EDIT_PATHNAME}/${_id}`
              }
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答卷: {answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={handleClickEdit}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={handleClickStats}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                icon={<StarOutlined />}
                type="text"
                size="small"
                onClick={updateStar}
                disabled={updateStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                onClick={handleDuplicate}
                disabled={duplicateLoading}
              >
                复制
              </Button>

              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
