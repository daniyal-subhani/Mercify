import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";

export const createOrder =async (   orderData ) => {
  try {
    const response = await axiosInstance.post(
        `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.CREATE_ORDER}`,
        orderData
    )
  } catch (error) {
    return error.response.data.message || "Failed to create order";
  }
}



export const getOrderById = async (orderId) => {
  try {
    const response = await axiosInstance.get(
        `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.GET_ORDER}/${orderId}`
    )
  } catch (error) {
    return error.response.data.message || "Failed to get order";
  }
}