import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const categoriesThunk = createAsyncThunk(
  "productMeta/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${backendRoutes.PRODUCT_META_DATA.BASE}${backendRoutes.PRODUCT_META_DATA.GET_CATEGORIES}`
      );
      


      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const subCategoriesThunk = createAsyncThunk(
  "productMeta/subCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${backendRoutes.PRODUCT_META_DATA.BASE}${backendRoutes.PRODUCT_META_DATA.GET_SUB_CATEGORIES}`
      );
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sizeThunk = createAsyncThunk(
  "productMeta/sizes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${backendRoutes.PRODUCT_META_DATA.BASE}${backendRoutes.PRODUCT_META_DATA.GET_SIZES}`
      );
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
