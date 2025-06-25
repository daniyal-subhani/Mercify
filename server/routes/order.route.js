import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { checkOutSchema } from "../validators/checkout.validator.js";


const orderRoutes = Router();


orderRoutes.post("/createOrder", validateSchema(checkOutSchema) ,createOrder);

export default orderRoutes;