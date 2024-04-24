import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import AxiosClient from "../client/client";
const client = new AxiosClient();

const initialState = {
  works: [],
  isLoading: false,
  error: null,
  totalWorks: 0,
};

export const getAllWorks = createAsyncThunk(`work/GETWORKS`, async () => {
  return await client.get("/works");
});

const worksSlice = createSlice({
    name: "works",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getAllWorks.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllWorks.fulfilled, (state, action) => { 
          state.isLoading = false;
          state.totalWorks = action.payload.length;
          state.works = action.payload;
        })
        .addCase(getAllWorks.rejected, (state) => {
          state.isLoading = false;
          state.error = "Ops, an error has occurred.";
        });
    },
  });
  

export const allWorks = (state) => state.worksData.works;
export const isWorkLoading = (state) => state.worksData.isLoading;
export const worksError = (state) => state.worksData.error;
export default worksSlice.reducer;
