import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentStateType } from "../store/componentsReducer";
import { StateWithHistory } from "redux-undo";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.component.present
  ) as ComponentStateType;
  const { past, future } = useSelector<StateType>(
    (state) => state.component
  ) as StateWithHistory<StateType>;
  const canRedo = past.length > 0;
  const canUndo = future.length > 0;
  const { componentList = [], selectedId = "", copiedComponent } = components;

  const selectedComponent = componentList.find(
    (component) => component.fe_id === selectedId
  );

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
    canRedo,
    canUndo,
  };
}

export default useGetComponentInfo;
