import { backendRoutes } from "@/helpers/backendRoutes"
import { axiosInstance } from "@/lib/axiosInstance"


export const getUserProfile =async (id) => { 
  try {
    const response = await axiosInstance.get(`${backendRoutes.USER.BASE}${backendRoutes.USER.PROFILE}/${id}`)
    
    const {user} = response.data.data
  console.log(user);
  
    
    return user
  } catch (error) {
    return error.response.data.message || "Failed to get user profile"
  }
}
