import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentStateType } from "../store/componentsReducer";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.component
  ) as ComponentStateType;
  const { componentList = [], selectedId = "" } = components;
  return {
    componentList,
    selectedId,
  };
}

export default useGetComponentInfo;
