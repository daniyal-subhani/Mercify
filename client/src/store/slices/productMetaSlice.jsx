import { createSlice } from "@reduxjs/toolkit";
import {
  categoriesThunk,
  sizeThunk,
  subCategoriesThunk,
} from "../thunks/productMetaThunk";

const initialState = {
  categories: [],
  subCategories: [],
  sizes: [],
  isLoading: false,
  error: null,
};
export const productMetaSlice = createSlice({
  name: "productMeta",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(categoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(categoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(categoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(subCategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(subCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
        state.error = null;
      })
      .addCase(subCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(sizeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sizeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sizes = action.payload;
        state.error = null;
      })
      .addCase(sizeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});



export default productMetaSlice.reducer;

