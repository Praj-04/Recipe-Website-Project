import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";

export const getAllRecipes = createAsyncThunk(
  "/allTheRecipes",
  async (body, ThunkAPI) => {
    try {
      ThunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/recipes/all");
      // console.log('get all recipes', response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      ThunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getPublicRecipes = createAsyncThunk(
  "/publicRecipes",
  async (body, ThunkAPI) => {
    try {
      ThunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/recipes/public");
      //  console.log('get all recipes', response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      ThunkAPI.dispatch(setLoading(false));
    }
  }
);


//didnt use owner id check here..for edit later check if adding owner id reqd,and for public try access recipe from all recipe using filter
export const getOneRecipe = createAsyncThunk(
  "/recipes/oneRecipe",
  async(recipeId,ThunkAPI) => {
    try {
      //  console.log(`value in body is : ${recipeId}`);
       ThunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get(`/recipes/one/${recipeId}`);
      //  console.log(response.result)
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
       ThunkAPI.dispatch(setLoading(false));
    }
  }
);

export const editRecipe = createAsyncThunk("/recipes/update",async(body, ThunkAPI) =>{
  try {
    ThunkAPI.dispatch(setLoading(true));
    const response =await axiosClient.put('/recipes/update',body)
    return response.result;
  } catch (error) {
    return Promise.reject(error)
  }finally{
    ThunkAPI.dispatch(setLoading(false));
  }
})

export const deleteRecipe = createAsyncThunk("recipes/delete", async(recipeId, ThunkAPI) => {
  try {
    ThunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.delete(`/recipes/delete/${recipeId}`)
return response.result
  } catch (error) {
    console.log(error)
  }finally{
    ThunkAPI.dispatch(setLoading(false));
  }
})



const recipeSlice = createSlice({
  name: "recipeSlice",
  initialState: {
    recipes: [],
    publicRecipes: [],
    oneRecipe:null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload.allRecipes;
      })
      .addCase(getPublicRecipes.fulfilled, (state, action) => {
        state.publicRecipes = action.payload.allRecipes;
        // console.log("the recipe:", state.recipes);
      })
      .addCase(getOneRecipe.fulfilled,(state,action)=> {
        state.oneRecipe=action.payload
        // console.log("the recipe:", state.oneRecipe);
      }).addCase(editRecipe.fulfilled,(state,action) =>{
        state.oneRecipe=action.payload;
      }).addCase(deleteRecipe.fulfilled,(state,action)=> {
        state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload)
      })
  },
});

export default recipeSlice.reducer;
