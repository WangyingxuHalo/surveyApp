import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
  user: UserStateType;
  component: ComponentStateType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // store current login user information
    user: userReducer,
    // store component list info
    component: componentsReducer,
    // store page info
    pageInfo: pageInfoReducer,
  },
});
