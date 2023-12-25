import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../redux/reducers/chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
    },
  });
};
