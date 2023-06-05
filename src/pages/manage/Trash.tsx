import React, { FC, useState } from "react";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Spin,
} from "antd";
import styles from "./Common.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import { useRequest } from "ahooks";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../services/question";

const { Title } = Typography;
const { confirm } = Modal;

const tableColumns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "发布状态",
    dataIndex: "isPublished",
    key: "isPublished",
    render: (isPublished: boolean) => {
      return isPublished ? (
        <Tag color="processing">已发布</Tag>
      ) : (
        <Tag>未发布</Tag>
      );
    },
  },
  {
    title: "答卷数量",
    dataIndex: "answerCount",
    key: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const Trash: FC = () => {
  const {
    loading,
    data = {},
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list: questionList = [], total = 0 } = data;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { run: recoverSurvey } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success("恢复成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );

  const { run: deleteSurvey } = useRequest(
    async () => {
      const data = await deleteQuestionService(selectedIds);
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );

  const handleRecover = () => {
    confirm({
      title: "确认恢复所有选中问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "选中问卷将从回收站中恢复",
      onOk: () => {
        recoverSurvey();
      },
    });
  };

  const handleDelete = () => {
    confirm({
      title: "确认删除所有选中问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后无法找回",
      onOk: () => {
        deleteSurvey();
      },
    });
  };

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={handleRecover}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0}
            onClick={handleDelete}
          >
            删除
          </Button>
        </Space>
        <Table
          dataSource={questionList}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys) => {
              setSelectedIds(selectedRowKeys as string[]);
            },
          }}
        />
      </div>
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && questionList.length === 0 && (
          <Empty description="暂无数据" />
        )}
        {!loading && questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
