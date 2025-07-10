import { createSlice } from "@reduxjs/toolkit";
import { getAllProductsThunk } from "../thunks/productThunk";


const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
extraReducers: (builder) => {
  builder
    .addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(getAllProductsThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllProductsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export default productSlice.reducer;