import {Router} from "express"
import { ROUTES } from "../helpers/routeNames.js"
import { getUserProfile, updateUserProfile } from "../controllers/user_profile.controller.js"


const userRoutes = Router()

userRoutes.get(ROUTES.USER.PROFILE, getUserProfile)
userRoutes.post(ROUTES.USER.UPDATE, updateUserProfile)


export default userRoutes