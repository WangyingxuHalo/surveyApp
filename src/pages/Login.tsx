import React, { FC, useEffect } from "react";
import {
  Space,
  Typography,
  Form,
  Input,
  Checkbox,
  Button,
  message,
} from "antd";
import styles from "./Register.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { LIST_PATHNAME, REGISTER_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { loginService } from "../services/user";
import { setToken } from "../utils/user-token";

const { Title } = Typography;

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};

const deleteUser = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

const getUserInfoFromStorage = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};

const Login: FC = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  const { run: loginSubmit, loading: loginLoading } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = "" } = result;
        setToken(token);
        message.success("登录成功");
        nav(LIST_PATHNAME);
      },
    }
  );

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    const { username, password, remember } = values || {};
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUser();
    }
    loginSubmit(username, password);
  };

  const onSubmitFailed = () => {
    alert("failed");
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>登陆</Title>
          </Space>
        </div>
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "请输入你的用户名!" },
                {
                  type: "string",
                  min: 5,
                  max: 20,
                  message: "用户名长度需在5-20之间",
                },
                {
                  pattern: /^\w+$/,
                  message: "只能是字母数字下划线",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={loginLoading}
                >
                  登录
                </Button>
                <Link to={REGISTER_PATHNAME}>没有账号?注册</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
