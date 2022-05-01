import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/selectedUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
