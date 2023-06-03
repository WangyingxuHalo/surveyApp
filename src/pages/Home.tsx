import React, { FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { LIST_PATHNAME } from "../router";
import styles from "./Home.module.scss";

import axios from "axios";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const handleGoToList = () => {
    nav(LIST_PATHNAME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
        <div>
          <Button type="primary" onClick={handleGoToList}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
