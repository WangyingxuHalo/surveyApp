import React, { FC, useEffect, useState } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import { HOME_PATHNAME, LIST_PATHNAME } from "../router";
import useGetUserInfo from "../hooks/useGetUserInfo";

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathName] = useState("/");

  useEffect(() => {
    if (username) {
      setPathName(LIST_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷系统</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
