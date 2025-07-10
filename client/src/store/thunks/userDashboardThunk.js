import { backendRoutes } from "@/helpers/backendRoutes"
import { axiosInstance } from "@/lib/axiosInstance"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getUserThunk =createAsyncThunk("userProfile/getProfile" ,async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`
        ${backendRoutes.USER.BASE}${backendRoutes.USER.PROFILE}
        `)
        
  } catch (error) {
    return rejectWithValue(error.response.data.message) ||  "Failed to fetch  profile"
  }
}
)

export const updateUserThunk =createAsyncThunk("userProfile/updateProfile" ,async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`
      ${backendRoutes.USER.BASE}${backendRoutes.USER.UPDATE_PROFILE}
      `)
  } catch (error) {
    return rejectWithValue(error.response.data.message) || "Failed to fetch profile"
  }
})
