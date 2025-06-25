export const ROUTES = {
  AUTH: {
    BASE: "/api/auth",
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
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
  },
  PRODUCT: {
    BASE: "/api/products",
    CREATE: "/",
    UPDATE: "/:id",
    DELETE: "/:id",
  },
  ORDER: {
    BASE: "/api/orders",
    CREATE: "/",
    UPDATE: "/:id",
    DELETE: "/:id",
  },

};
