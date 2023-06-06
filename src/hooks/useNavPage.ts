import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LIST_PATHNAME,
  LOGIN_PATHNAME,
  isLoginOrRegister,
  noNeedLogin,
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (waitingUserData) {
      return;
    }
    // Already login
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(LIST_PATHNAME);
      }
      return;
    }
    // haven't login
    if (noNeedLogin(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [username, waitingUserData, pathname]);
}

export default useNavPage;
