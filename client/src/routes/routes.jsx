import {
  NotFound,
  RouteAbout,
  RouteAllUsers,
  RouteBecomeSeller,
  RouteCart,
  RouteCheckout,
  RouteCollection,
  RouteContact,
  RouteGetAllOrders,
  RouteIndex,
  RouteOrderConfirmation,
  RouteOrderHistory,
  RouteSellerPublicProfile,
  RouteSignIn,
  RouteSignUp,
  RouteUserOrders,
  RouteUserProfile,
  RouteUserPublicProfile,
} from "@/helpers/routesName";
import About from "@/pages/About";
import AllOrdersPage from "@/pages/AllOrdersPage";
import AllUsers from "@/pages/AllUsers";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CollectionPage from "@/pages/CollectionsPage";
import ContactUs from "@/pages/ContactUs";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFound/404";
import OrderConfirmation from "@/pages/OrderConfirmation";
import OrderHistory from "@/pages/OrderHistory";
import ProductDetails from "@/pages/ProductDetails";
import SellerForm from "@/pages/seller/SellerForm";
import SellerPublicProfilePage from "@/pages/seller/SellerPublicProfilePage";
import UserProfilePage from "@/pages/user.profile";
import SignIn from "@/pages/userAuth/SignIn";
import SignUp from "@/pages/userAuth/SignUp";
import UserOrders from "@/pages/UserOrders";
import UserProfile from "@/pages/UserProfile";
import UserPublicProfile from "@/pages/UserPublicProfile";

export const appRoutes = [
  { path: RouteIndex, element: <HomePage /> },
  { path: RouteCollection, element: <CollectionPage /> },
  { path: RouteAbout, element: <About /> },
  { path: RouteContact, element: <ContactUs /> },
  { path: `${RouteCollection}/:category/:id`, element: <ProductDetails /> },
  {path: RouteCart, element: <CartPage />},
  {path: RouteCheckout, element: <CheckoutPage />},
  {path: RouteOrderConfirmation, element: <OrderConfirmation />},
  {path: RouteOrderHistory, element: <OrderHistory />},
  { path: RouteSignUp, element: <SignUp /> },
  { path: RouteSignIn, element: <SignIn /> },
  {path: RouteUserPublicProfile, element: <UserPublicProfile />},
  {path: RouteUserProfile, element: <UserProfilePage />},
  {path: RouteGetAllOrders, element: <AllOrdersPage />},
  {path: RouteBecomeSeller, element: <SellerForm />},
  {path: RouteAllUsers, element: <AllUsers />},
  {path: RouteSellerPublicProfile, element: <SellerPublicProfilePage />},
  {path: RouteUserOrders, element: <UserOrders />},
  { path: NotFound, element: <NotFoundPage /> },
];
