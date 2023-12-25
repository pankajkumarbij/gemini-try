import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatVar",
  initialState: {
    chatVar: "",
  },
  reducers: {
    setChatChunks: (state, action) => {
      state.chatVar = action.payload;
    },
  },
});

export const { setChatChunks } = chatSlice.actions;

export default chatSlice.reducer;
