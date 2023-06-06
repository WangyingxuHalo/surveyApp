import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfoService } from "../services/user";
import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { removeToken } from "../utils/user-token";
import { LOGIN_PATHNAME } from "../router";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {};
  const { username, nickname } = useGetUserInfo();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutReducer());
    removeToken();
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  };

  const UserInfo = (
    <>
      <Space>
        <span style={{ color: "#e8e8e8" }}>
          <UserOutlined />
          {nickname}
        </span>
        <Button size="small" onClick={logout}>
          退出
        </Button>
      </Space>
    </>
  );

  const Login = <Link to="/login">登陆</Link>;

  return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;
