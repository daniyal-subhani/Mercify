import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProductsThunk = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.GET_ALL_PRODUCTS}`
      );
      return response.data.data; 
      
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch products");
    }
  }
);

