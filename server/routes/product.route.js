import { Router } from "express";
import { createProduct, getAllProducts, getProductsBySeller, getProductWithRelated } from "../controllers/product.controller.js";
import { createProductSchema } from "../validators/product.validator.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { ROUTES } from "../helpers/routeNames.js";
import upload from "../config/multer.js";
import { authTokenMiddleware } from "../middlewares/auth.middleware.js";

const productRoutes = Router();


productRoutes.post(ROUTES.PRODUCT.CREATE, authTokenMiddleware , upload.array("productImages", 5) ,validateSchema(createProductSchema) ,createProduct)
productRoutes.get(ROUTES.PRODUCT.GET_ALL_PRODUCTS, getAllProducts)
productRoutes.get(ROUTES.PRODUCT.PRODUCT_DETAILS, getProductWithRelated)
productRoutes.get(ROUTES.PRODUCT.GET_SELLER_PRODUCTS, authTokenMiddleware, getProductsBySeller)


export default productRoutes;