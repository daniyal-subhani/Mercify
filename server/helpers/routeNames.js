

export const ROUTES = {
  AUTH: {
    BASE: "/api/auth",
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH_TOKEN: "/refresh-token",
  },
  USER: {
    BASE: "/api/users",
    PROFILE: "/profile",
    UPDATE: "/update/:userId",

  },
  SELLER: {
    BASE: "/api/sellers",
    PROFILE: "/profile",
    UPDATE: "/update/:userId",
    BECOME_SELLER: "/become_seller",
  },
  PRODUCT: {
    BASE: "/api/product",
    CREATE: "/add-product",
    UPDATE: "/:id",
    DELETE: "/:id",
    GET_ALL_PRODUCTS: "/get-all-products",
    PRODUCT_DETAILS: "/get-product/:id",
    GET_SELLER_PRODUCTS: "/seller_products"
  },
  ORDER: {
    BASE: "/api/orders",
    CREATE: "/create-order",
    UPDATE: "/:id",
    DELETE: "/:id",
    GET_ALL_ORDERS: "/all_orders",
    GET_ORDER_BY_ID: "/get-order-by-id/:orderId",
    GET_ORDER_BY_USER: "/get-order-by-user",
    GET_ORDER_BY_SELLER: "/get-order-by-seller",
  },
  PRODUCT_META_DATA: {
    BASE: "/api/productMetaData",
    CATEGORIES: "/categories",
    SUB_CATEGORIES: "/subCategories",
    SIZES: "/sizes",
  },
  PUBLIC_PROFILES: {
    BASE:  "/api/profile" ,
   USER: "/user/:userId",
   SELLER: "/seller/:userId"
  }, 
  ALL_USERS: {
    BASE: "/api/users",
    GET_ALL_USERS: "/all_users"
  }, 
  PROFILES: {
    BASE: "/api/profile",
    GET: "/get_profile",
    UPDATE: "/update_profile",
    UPDATE_SELLER: "/update_seller",
    GET_SELLER_PUBLIC_PROFILE_PAGE: "/sellers/seller/:sellerId"
  },
   DASHBOARD_DATA: {
    BASE: "/api/sellers",
    GET_SELLER_DASHBOARD: "/dashboard"
  }

};
