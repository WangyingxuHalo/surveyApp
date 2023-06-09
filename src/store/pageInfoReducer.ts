import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

export const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    // reset all page info
    resetPageInfo: (
      state: PageInfoType,
      action: PayloadAction<PageInfoType>
    ) => {
      return action.payload;
    },
    // change page title
    changePageTitle: (state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
