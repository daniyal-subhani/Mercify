import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import appUtils from "@/lib/appUtils";
import { RouteIndex } from "@/helpers/routesName";

const SellerNavbar = ({ onToggleSidebar }) => {
  const {navigate} = appUtils();

  const handleLogout = () => {
    // Clear tokens, context, etc. if needed
    navigate("/signin");
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
      <Button variant="outline" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </header>
  );
};

export default SellerNavbar;
