import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <UserInfo />
          </div>
        </Header>
        <Content className={styles.main}>
          {waitingUserData ? (
            <div style={{ textAlign: "center", marginTop: "200px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
        <Footer className={styles.footer}>
          Copyright &copy; 2023 - present. Created by Yingxu
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
