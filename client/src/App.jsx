import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { appRoutes } from "@/routes/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import appUtils from "./lib/appUtils";
import { SellerRoutes } from "./routes/seller.routes";
import { Toaster } from "./components/ui/sonner";



const App = () => {
  const { location } = appUtils();

   
 


  const hideLayoutRoutes = ["/signin", "/signup", "/become-seller"];
  const is404 =
    location.pathname !== "/" &&
    ![...appRoutes, ...SellerRoutes].some(
      (route) =>
        route.path !== "*" &&
        matchPath({ path: route.path, end: false }, location.pathname)
    );

  const isSellerRoute = location.pathname.startsWith("/seller");

  const shouldHideLayout =
    hideLayoutRoutes.includes(location.pathname) || is404 || isSellerRoute;

  const renderRoutes = (routes) =>
    routes.map(({ path, element, children }) => (
      <Route key={path} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));

  return (
    <div>
      {!shouldHideLayout && <Navbar />}
      <div>
        <Routes>
          {renderRoutes(appRoutes)}
          {renderRoutes(SellerRoutes)}
        </Routes>
        <Toaster position="top-center" />
      </div>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default App;
