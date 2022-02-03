import { configureStore } from "@reduxjs/toolkit";
import apodReducer from "./apodSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    apod: apodReducer,
    auth: authReducer,
  },
});
