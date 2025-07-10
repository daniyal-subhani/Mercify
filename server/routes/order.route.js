import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, getOrdersBySellerId, getOrdersByUserId } from "../controllers/order.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { checkOutSchema } from "../validators/checkout.validator.js";
import { ROUTES } from "../helpers/routeNames.js";
import { authTokenMiddleware } from "../middlewares/auth.middleware.js";


const orderRoutes = Router();


orderRoutes.post(ROUTES.ORDER.CREATE, authTokenMiddleware ,createOrder);
orderRoutes.get(ROUTES.ORDER.GET_ALL_ORDERS, getAllOrders)
orderRoutes.get(ROUTES.ORDER.GET_ORDER_BY_ID, getOrderById)
orderRoutes.get(ROUTES.ORDER.GET_ORDER_BY_USER, authTokenMiddleware, getOrdersByUserId)
orderRoutes.get(ROUTES.ORDER.GET_ORDER_BY_SELLER, authTokenMiddleware , getOrdersBySellerId)

export default orderRoutes;