import { Router } from "express";

import { ROUTES } from "../helpers/routeNames.js";
import {
  getSellerProfile,
  updateSellerProfile,
} from "../controllers/seller_profile.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { sellerSchema } from "../validators/seller.validator.js";
import {
  authTokenMiddleware,
  isSeller,
} from "../middlewares/auth.middleware.js";

const sellerRoutes = Router();

sellerRoutes.get(
  ROUTES.SELLER.PROFILE,
  authTokenMiddleware,
  isSeller,
  getSellerProfile
);
sellerRoutes.post(
  ROUTES.SELLER.UPDATE,
  validateSchema(sellerSchema),
  authTokenMiddleware,
  updateSellerProfile
);

export default sellerRoutes;
