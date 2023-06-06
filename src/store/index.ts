import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentStateType } from "./componentsReducer";

export type StateType = {
  user: UserStateType;
  component: ComponentStateType;
};

export default configureStore({
  reducer: {
    // store current login user information
    user: userReducer,
    component: componentsReducer,
  },
});
