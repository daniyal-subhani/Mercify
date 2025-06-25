import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { assets } from "@/assets/frontend_assets/assets";
import { CircleX, Menu, Search, ShoppingCart } from "lucide-react";
import {
  RouteIndex,
  RouteCollection,
  RouteAbout,
  RouteContact,
  RouteSignIn,
  RouteCart,
  RouteBecomeSeller,
} from "@/helpers/routesName";
import { useSearch } from "@/context/SearchContext";
import appUtils from "@/lib/appUtils";
import ProfilePicture from "./Avatar";
import { logout } from "@/store/slices/authSlice";

const Navbar = () => {
  const { setSearchQuery, showSearchBar, setShowSearchBar } = useSearch();
  const [open, setOpen] = React.useState(false);
  const mobileMenuRef = useRef(null);
  const { navigate, location, selector, dispatch } = appUtils();
  const cart = selector((state) => state.cart.cartItems);
  const {user} = selector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (location.pathname === RouteCollection) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
      setSearchQuery("");
    }
  }, [location.pathname]);

  const handleSearchClick = () => {
    if (location.pathname !== RouteCollection) {
      navigate(RouteCollection);
      setTimeout(() => setShowSearchBar(true), 100);
    } else {
      setShowSearchBar(true);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate(RouteSignIn);
    } catch (error) {
  console.error("Error logging out:", error);
    }
  }
  

  return (
    <div className="bg-gray-50 w-full">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-4 border-b border-gray-300 bg-violet-500 relative">
        <NavLink to={RouteIndex}>
          <img
            src={assets.logo}
            alt="logo_mercify"
            className="h-10 sm:h-12 md:h-14"
          />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6">
          {[
            { label: "Home", to: RouteIndex },
            { label: "Collection", to: RouteCollection },
            { label: "About", to: RouteAbout },
            { label: "Contact", to: RouteContact },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-white hover:text-gray-200 text-lg"
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink to={RouteBecomeSeller}>
            <Button className="text-white bg-violet-600 hover:bg-black">Become a Seller</Button>
          </NavLink>

          <button onClick={handleSearchClick} aria-label="Search">
            <Search className="text-white" />
          </button>

          <NavLink to={RouteCart} className="relative">
            <ShoppingCart className="text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </NavLink>

          {user ? (
            <div className="relative group ">
              <ProfilePicture src={""} alt="User" size="sm" className="ml-2" user={user} />
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md  hidden group-hover:block z-50 ">
                <NavLink to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Your Profile</NavLink>
                <Button onClick={handleLogout} className="w-full rounded-none" variant="ghost">Logout</Button>
              </div>
            </div>
          ) : (
            <NavLink to={RouteSignIn}>
              <Button className="bg-white text-black hover:bg-gray-200 text-lg font-semibold rounded-full px-6 py-2">
                Login
              </Button>
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="sm:hidden" aria-label="Menu">
          <Menu className="text-white" />
        </button>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`${
            open ? "flex" : "hidden"
          } sm:hidden absolute top-[60px] left-0 w-full flex-col bg-violet-500 text-white px-6 py-4 z-50`}
        >
          {[RouteIndex, RouteCollection, RouteAbout, RouteContact].map((to, i) => (
            <NavLink
              key={i}
              to={to}
              onClick={() => setOpen(false)}
              className="py-2 text-lg border-b border-violet-400"
            >
              {to.replace("/","") || "Home"}
            </NavLink>
          ))}
          <NavLink
            to={RouteBecomeSeller}
            onClick={() => setOpen(false)}
            className="py-2 text-lg border-b border-violet-400"
          >
            Become a Seller
          </NavLink>
          <NavLink
            to={RouteCart}
            onClick={() => setOpen(false)}
            className="py-2 flex items-center gap-2 text-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart ({cart.length})
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className="py-2 text-lg">Your Profile</NavLink>
              <Button onClick={handleLogout} variant="ghost" className="text-left w-full">Logout</Button>
            </>
          ) : (
            <NavLink to={RouteSignIn} className="py-2 text-lg">
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* Search Input */}
      {showSearchBar && (
        <div className="px-4 py-3 bg-gray-100">
          <div className="relative flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 max-w-xl mx-auto">
            <Search className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent outline-none"
            />
            <button
              onClick={() => setShowSearchBar(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close Search"
            >
              <CircleX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
