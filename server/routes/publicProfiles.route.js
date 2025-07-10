import {Router} from "express"
import { ROUTES } from "../helpers/routeNames.js"
import { userPublicProfile } from "../controllers/userPublicProfile.controller.js"
import { sellerPublicProfile } from "../controllers/sellerPublicProfile.controller.js"


const publicRoutes = Router()


publicRoutes.get(ROUTES.PUBLIC_PROFILES.USER, userPublicProfile)
publicRoutes.get(ROUTES.PUBLIC_PROFILES.SELLER, sellerPublicProfile)


export default publicRoutes