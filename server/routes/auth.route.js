import {Router} from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { ROUTES } from "../helpers/routeNames.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";


const authRoutes = Router();


authRoutes.post(ROUTES.AUTH.REGISTER, validateSchema(registerSchema) ,registerUser)
authRoutes.post(ROUTES.AUTH.LOGIN, validateSchema(loginSchema) ,loginUser)
authRoutes.post(ROUTES.AUTH.LOGOUT ,logoutUser)


export default authRoutes;