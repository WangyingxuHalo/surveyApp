import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentStateType } from "../store/componentsReducer";
import { StateWithHistory } from "redux-undo";
import { UserActionStateType } from "../store/userActionReducer";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.component.present
  ) as ComponentStateType;
  const { isUser } = useSelector<StateType>(
    (state) => state.userAction
  ) as UserActionStateType;
  const { past, future } = useSelector<StateType>(
    (state) => state.component
  ) as StateWithHistory<StateType>;
  const canRedo = past.length > 0;
  const canUndo = future.length > 0;
  const {
    componentList = [],
    selectedId = "",
    copiedComponent,
    createIds,
    deleteIds,
  } = components;

  const selectedComponent = componentList.find(
    (component) => component.fe_id === selectedId
  );

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
    createIds,
    deleteIds,
    isUserAction: isUser,
    canRedo,
    canUndo,
  };
}

export default useGetComponentInfo;
