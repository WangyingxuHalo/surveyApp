import axios from "axios";
import { message } from "antd";
import { getToken } from "../utils/user-token";

const instance = axios.create();

// request intercept: add token
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Basic ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response intercept: deal with error and message
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    // error tip
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
