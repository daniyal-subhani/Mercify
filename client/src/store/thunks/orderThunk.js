import { backendRoutes } from "@/helpers/backendRoutes"
import { axiosInstance } from "@/lib/axiosInstance"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const placeOrder =createAsyncThunk("order/placeOrder" ,async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`
        ${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.CREATE_ORDER}
        `)
  } catch (error) {
    return rejectWithValue(error.response.data.message) || "Failed to place order"
  }
})


export const getOrderHistory =createAsyncThunk( "order/orderHistory" ,async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`
        ${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.GET_ALL_ORDERS}
        `)
  } catch (error) {
    return rejectWithValue(error.response.data.message) || "Failed to get order history"
  }
}

)