import {  createSlice } from "@reduxjs/toolkit";
// import { axiosClient } from "../../utils/axiosClient";

// export const getAllRecipes = createAsyncThunk(
//   "/allTheRecipes",
//   async (body, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoading(true));
//       const response = await axiosClient.get("/recipes/all");
//       console.log('get all recipes', response);
//       return response.result;
//     } catch (error) {
//       return Promise.reject(error);
//     } finally {
//         thunkAPI.dispatch(setLoading(false));
//     }
//   }
// );

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default appConfigSlice.reducer;
export const { setLoading } = appConfigSlice.actions;
