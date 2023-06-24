import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";
import { getToken, removeToken } from "../utils/user-token";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { message } from "antd";

// After ajax load, put into redux, no need to return
function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      if (error.response && error.response.status === 401) {
        message.error(`${error.response.data.msg},返回登录页`);
        removeToken();
        nav(LOGIN_PATHNAME);
      }
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  const { username } = useGetUserInfo();

  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    if (getToken() == null) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username, getToken()]);
  return { waitingUserData };
}

export default useLoadUserData;
