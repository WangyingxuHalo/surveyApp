import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
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
  },
});

export const { resetComponents, changeSelectedId } = componentSlice.actions;

export default componentSlice.reducer;
