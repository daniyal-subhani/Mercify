import { Router } from  "express";
import { ROUTES } from "../helpers/routeNames.js";
import { getCategories, getSizes, getSubCategories } from "../controllers/productMetaData.controller.js";

const productMetaDataRoutes = Router();

productMetaDataRoutes.get(ROUTES.PRODUCT_META_DATA.CATEGORIES, getCategories);
productMetaDataRoutes.get(ROUTES.PRODUCT_META_DATA.SUB_CATEGORIES, getSubCategories);
productMetaDataRoutes.get(ROUTES.PRODUCT_META_DATA.SIZES, getSizes);


export default productMetaDataRoutes;