import {
  NotFound,
  RouteAbout,
  RouteBecomeSeller,
  RouteCart,
  RouteCheckout,
  RouteCollection,
  RouteContact,
  RouteIndex,
  RouteOrderConfirmation,
  RouteOrderHistory,
  RouteSignIn,
  RouteSignUp,
  RouteUserProfile,
} from "@/helpers/routesName";
import About from "@/pages/About";
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
import SignIn from "@/pages/userAuth/SignIn";
import SignUp from "@/pages/userAuth/SignUp";
import UserProfile from "@/pages/UserProfile";

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
  {path: RouteUserProfile, element: <UserProfile />},
  { path: RouteSignUp, element: <SignUp /> },
  { path: RouteSignIn, element: <SignIn /> },
  {path: RouteBecomeSeller, element: <SellerForm />},
  { path: NotFound, element: <NotFoundPage /> },
];
