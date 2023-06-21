import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import userActionReducer, { UserActionStateType } from "./userActionReducer";

export type StateType = {
  user: UserStateType;
  // component: ComponentStateType;
  component: StateWithHistory<ComponentStateType>; // add undo
  pageInfo: PageInfoType;
  userAction: UserActionStateType;
};

export default configureStore({
  reducer: {
    // store current login user information
    user: userReducer,
    // store component list info
    // component: componentsReducer,
    component: undoable(componentsReducer, {
      limit: 20, // upper limit: 20
      filter: excludeAction([
        "component/resetComponents",
        "component/changeSelectedId",
        "component/selectPreviousComponent",
        "component/selectNextComponent",
      ]),
    }),
    // store page info
    pageInfo: pageInfoReducer,
    userAction: userActionReducer,
  },
});
