import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUpThunk = createAsyncThunk(
  "auth/signUpUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${backendRoutes.AUTH.BASE}${backendRoutes.AUTH.SIGNUP}`,
        formData
      );
      console.log(response.data);
      const {data} =  response.data;
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "SignUp failed"
      );
    }
  }
);


export const signInThunk = createAsyncThunk(
  "auth/signIn", async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${backendRoutes.AUTH.BASE}${backendRoutes.AUTH.LOGIN}`,
        formData
      )
      console.log(response.data);
      const {data} =  response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "SignIp failed"
      )
    }
  }
)


export const logoutThunk = createAsyncThunk(
  "auth/logout", async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${backendRoutes.AUTH.BASE}${backendRoutes.AUTH.LOGOUT}`
      )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Logout failed"
      )
    }
  }
)
