import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { getNextSelectedId } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

export const componentSlice = createSlice({
  name: "count",
  initialState: INIT_STATE,
  reducers: {
    // update store with new component list
    resetComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) => {
      return action.payload;
    },
    // Change selected ID
    changeSelectedId: (
      state: ComponentStateType,
      action: PayloadAction<string>
    ) => {
      state.selectedId = action.payload;
    },
    // add new component to canvas
    addComponent: (
      state: ComponentStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const componentToAdd = action.payload;
      const { selectedId, componentList } = state;
      const index = componentList.findIndex(
        (component) => component.fe_id === selectedId
      );

      if (index < 0) {
        // if select nothing -> add to the bottom
        componentList.push(componentToAdd);
      } else {
        // if select one -> insert component below that one
        componentList.splice(index + 1, 0, componentToAdd);
      }
      // set selected it to be current component
      state.selectedId = componentToAdd.fe_id;
    },
    // revise component properties
    changeComponentProps: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload;
      const currComponent = state.componentList.find(
        (component) => component.fe_id === fe_id
      );
      if (currComponent) {
        currComponent.props = {
          ...currComponent.props,
          ...newProps,
        };
      }
    },
    // delete component
    deleteComponent: (state: ComponentStateType) => {
      const { componentList, selectedId } = state;
      const componentIndex = componentList.findIndex(
        (component) => component.fe_id === selectedId
      );
      if (componentIndex === -1) {
        return;
      }
      const newSelectedId = getNextSelectedId(selectedId, componentList);
      state.selectedId = newSelectedId;
      componentList.splice(componentIndex, 1);
    },
    // hide component
    changeComponentHiddenStatus: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { fe_id, isHidden } = action.payload;
      const { componentList } = state;
      const componentIdx = componentList.findIndex(
        (component) => component.fe_id === fe_id
      );
      if (componentIdx === -1) {
        return;
      }
      componentList[componentIdx].isHidden = isHidden;

      if (isHidden) {
        // If we are going to hide element => selected ID = ""
        state.selectedId = "";
      } else {
        // if we are going to display element => selected ID = that element ID
        state.selectedId = fe_id;
      }
    },
    // lock / unlock component
    toggleComponentLocked: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload;
      const { componentList } = state;
      const componentToLock = componentList.find(
        (component) => component.fe_id === fe_id
      );
      if (componentToLock) {
        componentToLock.isLocked = !componentToLock.isLocked;
      }
    },
    // copy component
    copyComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state;
      const selectedComponent = componentList.find(
        (component) => component.fe_id === selectedId
      );
      if (selectedComponent) {
        state.copiedComponent = cloneDeep(selectedComponent);
      }
    },
    // paste component. Should change fe_id
    pasteComponent: (state: ComponentStateType) => {
      const { selectedId, componentList, copiedComponent } = state;
      if (copiedComponent == null) {
        return;
      }
      copiedComponent.fe_id = nanoid();
      const { fe_id } = copiedComponent;
      const selectedComponentIdx = componentList.findIndex(
        (component) => component.fe_id === selectedId
      );

      if (selectedComponentIdx === -1) {
        // If no component is selected, add to the back
        componentList.push(copiedComponent);
      } else {
        // add to the next index of component list
        componentList.splice(selectedComponentIdx + 1, 0, copiedComponent);
      }
      state.selectedId = fe_id;
    },
    // select previous component
    selectPreviousComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state;
      // It has to be a visible component
      const visibleComponentList = componentList.filter(
        (component) => !component.isHidden
      );
      // Find in visibleComponentList
      const currIndexInVisibleList = visibleComponentList.findIndex(
        (component) => component.fe_id === selectedId
      );
      if (currIndexInVisibleList === -1 || currIndexInVisibleList === 0) {
        return;
      }
      state.selectedId = visibleComponentList[currIndexInVisibleList - 1].fe_id;
    },
    // select next component
    selectNextComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state;
      // It has to be a visible component
      const visibleComponentList = componentList.filter(
        (component) => !component.isHidden
      );
      // Find in visibleComponentList
      const currIndexInVisibleList = visibleComponentList.findIndex(
        (component) => component.fe_id === selectedId
      );
      if (
        currIndexInVisibleList === -1 ||
        currIndexInVisibleList === visibleComponentList.length - 1
      ) {
        return;
      }
      state.selectedId = visibleComponentList[currIndexInVisibleList + 1].fe_id;
    },
    // change title name of component
    changeTitleName: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newTitle: string }>
    ) => {
      const { fe_id, newTitle } = action.payload;
      const { componentList } = state;
      const componentToChange = componentList.find(
        (component) => component.fe_id === fe_id
      );
      if (componentToChange) {
        componentToChange.title = newTitle;
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteComponent,
  changeComponentHiddenStatus,
  toggleComponentLocked,
  copyComponent,
  pasteComponent,
  selectPreviousComponent,
  selectNextComponent,
  changeTitleName,
} = componentSlice.actions;

export default componentSlice.reducer;
