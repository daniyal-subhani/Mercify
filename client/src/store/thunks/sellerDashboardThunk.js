import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSellerThunk = createAsyncThunk(
  "sellerProfile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`
        ${backendRoutes.SELLER.BASE}${backendRoutes.SELLER.PROFILE}
        `);
    } catch (error) {
      return (
        rejectWithValue(error.response.data.message) ||
        "Failed to fetch  profile"
      );
    }
  }
);

export const updateSellerThunk = createAsyncThunk(
  "sellerProfile/updateProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`
      ${backendRoutes.SELLER.BASE}${backendRoutes.SELLER.UPDATE_PROFILE}
      `);
    } catch (error) {
      return (
        rejectWithValue(error.response.data.message) ||
        "Failed to update  profile"
      );
    }
  }
);
