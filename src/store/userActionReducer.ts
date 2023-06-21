import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserActionStateType = {
  isUser: boolean;
};

const INIT_STATE: UserActionStateType = {
  isUser: false,
};

export const userActionSlice = createSlice({
  name: "userAction",
  initialState: INIT_STATE,
  reducers: {
    setIsUser(state: UserActionStateType, action: PayloadAction<boolean>) {
      state.isUser = action.payload;
    },
  },
});

export const { setIsUser } = userActionSlice.actions;

export default userActionSlice.reducer;
