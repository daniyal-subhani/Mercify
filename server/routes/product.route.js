import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { createProductSchema } from "../validators/product.validator.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const productRoutes = Router();


productRoutes.post("/addProduct", validateSchema(createProductSchema) ,createProduct)


export default productRoutes;