import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/authService";

export const doLogin = createAsyncThunk(
  "auth/LOGIN",
  async ({ email, password }) => {
    const response = await login({ email, password });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    value: null,
  },
  reducers: {
    logout: (state) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
