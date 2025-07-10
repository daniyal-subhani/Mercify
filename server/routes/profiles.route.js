import { Router } from "express";
import { ROUTES } from "../helpers/routeNames.js";
import { authTokenMiddleware } from "../middlewares/auth.middleware.js";
import { getProfiles, getSellerProfilePage, updateSellerDashboard, updateUserProfiles } from "../controllers/profiles.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { updateUserProfileSchema } from "../validators/user.validator.js";
import upload from "../config/multer.js";


const profilesRoutes = Router();

profilesRoutes.get(ROUTES.PROFILES.GET, authTokenMiddleware, getProfiles )
profilesRoutes.put(ROUTES.PROFILES.UPDATE, authTokenMiddleware, upload.single("profilePicture") , updateUserProfiles)
profilesRoutes.put(ROUTES.PROFILES.UPDATE_SELLER, authTokenMiddleware, upload.single("profilePicture") , updateSellerDashboard)
profilesRoutes.get(ROUTES.PROFILES.GET_SELLER_PUBLIC_PROFILE_PAGE, authTokenMiddleware ,getSellerProfilePage)


export default profilesRoutes;