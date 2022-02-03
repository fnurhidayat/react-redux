import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getAPODRequest } from "../services/apodService";

export const getAPOD = createAsyncThunk("apod/GET", async () => {
  const response = await getAPODRequest();
  return response.data;
});

export const getPreviousAPOD = createAsyncThunk("apod/GET_PREVIOUS", async (payload) => {
  console.log(payload);
  const previousDay = dayjs(payload).set("date", -1).format("YYYY-MM-DD");
  const response = await getAPODRequest({
    date: previousDay,
  });
  return response.data;
});

const apodSlice = createSlice({
  name: "apod",
  initialState: {
    status: "idle",
    value: null,
  },
  reducers: {
    clear: (state) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAPOD.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAPOD.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });

    builder
      .addCase(getPreviousAPOD.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPreviousAPOD.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { clear } = apodSlice.actions;

export const selectAPOD = (state) => state.apod;
export const isLoading = (state) => state.apod.status === "loading";

export default apodSlice.reducer;
