import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const initialState = {
  works: [],
  isLoading: false,
  error: null,
  totalWorks: 0,
  currentPage:1,
  pageSize:3,
  page:1,
  totalPage:1,
};

export const getAllWorks = createAsyncThunk(`work/GETWORKS`, async (page) => {
    return await client.get(`/works?page=${page}`);
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
          state.totalPage = Math.ceil(action.payload.length / state.pageSize);
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
export const selectCurrentPage = (state) => state.worksData.currentPage;
export const selectPageSize = (state) => state.worksData.pageSize;
export const selectTotalWorks = (state) => state.worksData.totalWorks;
export const selectTotalPage =(state)=>state.worksData.totalPage;
export default worksSlice.reducer;



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import AxiosClient from "../client/client";

// const client = new AxiosClient();

// const initialState = {
//   works: [],
//   isLoading: false,
//   error: null,
//   totalWorks: 0,
//   currentPage: 1,
//   pageSize: 4,
// };

// export const getAllWorks = createAsyncThunk(
//   "works/getAllWorks",
//   async (page, { rejectWithValue }) => {
//     try {
//       const response = await client.get(`/works?page=${page}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const worksSlice = createSlice({
//   name: "works",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllWorks.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getAllWorks.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.totalWorks = action.payload.totalWorks;
//         state.works = action.payload.payload;
//       })
//       .addCase(getAllWorks.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export const selectWorks = (state) => state.works.works;
// export const selectIsLoading = (state) => state.works.isLoading;
// export const selectError = (state) => state.works.error;
// export const selectCurrentPage = (state) => state.works.currentPage;
// export const selectPageSize = (state) => state.works.pageSize;
// export const selectTotalWorks = (state) => state.works.totalWorks;

// export default worksSlice.reducer;
