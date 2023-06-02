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
} from "antd";
import styles from "./Common.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";

const { Title } = Typography;
const { confirm } = Modal;

const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "3月10日13点23分",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: true,
    answerCount: 8,
    createdAt: "3月12日15点23分",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: false,
    answerCount: 2,
    createdAt: "3月14日17点23分",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: false,
    isStar: false,
    answerCount: 4,
    createdAt: "3月16日19点23分",
  },
];
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
  const [questionList, setQuestionList] = useState(rawQuestionList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDelete = () => {
    confirm({
      title: "确认删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后无法找回",
      onOk: () => message.success("删除成功"),
    });
  };

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  );
};

export default Trash;
