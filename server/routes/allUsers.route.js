

import {Router} from "express"
import { ROUTES } from "../helpers/routeNames.js"
import { getAllUserProfile } from "../controllers/allUsers.controller.js"

const getAllUsers = Router()


getAllUsers.get(ROUTES.ALL_USERS.GET_ALL_USERS, getAllUserProfile)



export default getAllUsers