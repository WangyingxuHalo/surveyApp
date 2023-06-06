import { useSelector, useDispatch } from "react-redux";
import { UserStateType } from "../store/userReducer";

type StateType = {
  user: UserStateType;
};

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user
  ) as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
