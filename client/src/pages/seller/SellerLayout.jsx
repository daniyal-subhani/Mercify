import React, { useState } from "react";
import SellerNavbar from "@/components/seller/SellerNavbar";
import { SellerSideBar } from "@/components/seller/SellerSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils"; // optional helper

const SellerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen relative w-full">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-md transition-transform duration-300 md:relative md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SellerSideBar onClose={handleCloseSidebar} />
        </div>

        {/* Overlay on small screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={handleCloseSidebar}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          <SellerNavbar onToggleSidebar={handleToggleSidebar} />
          <main className="flex-1 p-6 bg-muted/40 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SellerLayout;
