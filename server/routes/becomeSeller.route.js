import { Router } from "express";
import { ROUTES } from "../helpers/routeNames.js";
import { sellerRegister } from "../controllers/seller.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { sellerAuthSchema } from "../validators/seller.validator.js";
import {
  authTokenMiddleware,
  isSeller,
} from "../middlewares/auth.middleware.js";

const becomeSellerRoute = Router();

becomeSellerRoute.post(
  ROUTES.SELLER.BECOME_SELLER,
  validateSchema(sellerAuthSchema),
  authTokenMiddleware,
  sellerRegister
);

export default becomeSellerRoute;
