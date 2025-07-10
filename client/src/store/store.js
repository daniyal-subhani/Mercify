// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import productMetaReducer from "./slices/productMetaSlice";
import productSlice from "./slices/productSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "productMetaData"], // only persist  slice
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  productMetaData: productMetaReducer,
  products: productSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
