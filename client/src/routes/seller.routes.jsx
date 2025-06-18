import {
  RouteAddProduct,
  RouteBaseSellerURL,
  RouteSellerDashboard,
  RouteSellerOrders,
  RouteSellerProducts,
  RouteSellerProfile,
} from "@/helpers/sellerRoutesName";
import { AddProduct } from "@/pages/seller/AddProduct";
import AllProducts from "@/pages/seller/AllProducts";
import Dashboard from "@/pages/seller/Dashboard";
import Orders from "@/pages/seller/Orders";
import SellerLayout from "@/pages/seller/SellerLayout";
import SellerProfile from "@/pages/seller/SellerProfile";

export const SellerRoutes = [
  {
    path: RouteBaseSellerURL,
    element: <SellerLayout />,
    children: [
      { path: RouteSellerDashboard, element: <Dashboard /> },
      { path: RouteAddProduct, element: <AddProduct /> },
      { path: RouteSellerProducts, element: <AllProducts /> },
      { path: RouteSellerOrders, element: <Orders /> },
      { path: RouteSellerProfile, element: <SellerProfile /> },
    ],
  },
];
