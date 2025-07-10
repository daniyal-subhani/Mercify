import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import appUtils from "@/lib/appUtils";
import { RouteIndex, RouteSignIn } from "@/helpers/routesName";
import { logoutThunk } from "@/store/thunks/authThunk";
import { showToast } from "../shared/showToast";

const SellerNavbar = ({ onToggleSidebar }) => {
  const {navigate, dispatch, selector} = appUtils();
  const { user } = selector((state) => state.auth);

  const handleLogout =async () => {
 try {
       const result =await dispatch(logoutThunk());
       if (logoutThunk.fulfilled.match(result)) {
         navigate(RouteSignIn);
         showToast({
           message: "User Logout Successfully",
           type: "success"
         });
       } else {
         showToast({
           message: result.payload || "User logout failed",
           type: "error"
         })
       }
     } catch (error) {
       console.error("Error logging out:", error);
       showToast({
         message: "Something went wrong",
         type: "error"
       })
     }
   };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      {/* Left side: Logo + toggle button */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (visible on small screens) */}
        <button onClick={onToggleSidebar} className="md:hidden">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Logo */}
        <span onClick={()=> navigate(RouteIndex)}  className="cursor-pointer text-xl font-bold tracking-wide">Mercify</span>
      </div>

      {/* Logout Button */}
      {
        user ? (
 <Button variant="outline" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
        ) : (
          <Button variant="outline" onClick={()=> navigate(RouteSignIn)}>
            <LogOut className="w-4 h-4 mr-2" />
            Login
          </Button>
        )
      }
     
    </header>
  );
};

export default SellerNavbar;
