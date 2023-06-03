import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Space, Divider, message } from "antd";
import { useRequest } from "ahooks";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import styles from "./ManageLayout.module.scss";
import { LIST_PATHNAME, STAR_PATHNAME, TRASH_PATHNAME } from "../router";
import { createQuestionService } from "../services/question";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const {
    loading,
    run: handleCreateNew,
    error,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      message.success("创建成功");
      nav(`/question/edit/${result.id}`);
    },
  });
  // const [loading, setLoading] = useState(false);

  // const handleCreateNew = async () => {
  //   setLoading(true);
  //   const data = await createQuestionService();
  //   const { id } = data || {};
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("创建成功");
  //   }
  //   setLoading(false);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateNew}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav(LIST_PATHNAME)}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav(STAR_PATHNAME)}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav(TRASH_PATHNAME)}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
