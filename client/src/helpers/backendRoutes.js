export const backendRoutes = {
  AUTH: {
    BASE: "/auth",
    SIGNUP: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
  },
  USER: {
    BASE: "/profile",
    PROFILE: "/user",
    UPDATE_PROFILE: "/update-profile",
    UPDATE_PASSWORD: "/update-password",
    DELETE_ACCOUNT: "/delete-account",
  },
  SELLER: {
    BASE: "/seller",
    PROFILE: "/profile",
    UPDATE_PROFILE: "/update-profile",
    UPDATE_PASSWORD: "/update-password",
    DELETE_ACCOUNT: "/delete-account",
    
  },
  PRODUCT: {
    BASE: "/product",
    ADD_PRODUCT: "/add-product",
    UPDATE_PRODUCT: "/update-product",
    DELETE_PRODUCT: "/delete-product",
    GET_PRODUCT: "/get-product",
    GET_ALL_PRODUCTS: "/get-all-products",
    GET_PRODUCT_BY_CATEGORY: "/get-product-by-category",
    GET_PRODUCT_BY_BRAND: "/get-product-by-brand",
    GET_PRODUCT_BY_PRICE: "/get-product-by-price",
    GET_PRODUCT_BY_RATING: "/get-product-by-rating",
    GET_SELLER_PRODUCTS: "/seller_products"
  },
  ORDER: {
    BASE: "/orders",
    CREATE_ORDER: "/create-order",
    GET_ORDER: "/get-order",
    GET_ALL_ORDERS: "/all_orders",
    UPDATE_ORDER: "/update-order",
    DELETE_ORDER: "/delete-order",
    GET_ORDER_BY_STATUS: "/get-order-by-status",
    GET_ORDER_BY_DATE: "/get-order-by-date",
    GET_ORDER_BY_USER: "/get-order-by-user",
    GET_ORDER_BY_PRODUCT: "/get-order-by-product",
    GET_ORDER_BY_PAYMENT_METHOD: "/get-order-by-payment-method",
    GET_ORDER_BY_PAYMENT_STATUS: "/get-order-by-payment-status",
    GET_ORDER_BY_SHIPPING_STATUS: "/get-order-by-shipping-status",
    GET_ORDER_BY_SHIPPING_ADDRESS: "/get-order-by-shipping-address",
    GET_ORDER_BY_ID: "/get-order-by-id",
        GET_ORDER_BY_SELLER: "/get-order-by-seller",
  },
  PRODUCT_META_DATA: {
    BASE: "/productMetaData",
    GET_CATEGORIES: "/categories",
    GET_SUB_CATEGORIES: "/subCategories",
    GET_SIZES: "/sizes",
  },
  PUBLIC_PROFILES: {
    BASE: "/profile",
    USER: "/user/:userId",
    SELLER: "/sellers/seller",
  },
  ALL_USERS: {
    BASE: "/users",
    GET_ALL_USERS: "/all_users",
  },
  BECOME_SELLER: {
    BASE: "/sellers",
     PROFILE: "/profile",
    UPDATE: "/update",
    APPLY: "/apply",
    APPROVE: "/approve",
    REJECT: "/reject",
    BECOME_SELLER: "/become_seller",
  }, 
  PROFILE : {
    BASE: "/profile",
    GET: "/get_profile",
    UPDATE: "/update_profile",
    SELLER_UPDATE: "/update_seller"
  },
  DASHBOARD_DATA: {
    BASE: "/sellers",
    GET_SELLER_DASHBOARD: "/dashboard"
  }
};
