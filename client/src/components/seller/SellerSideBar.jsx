import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  ListOrdered,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    group: "Dashboard",
    links: [
      {
        to: "/seller",
        icon: LayoutDashboard,
        label: "Overview",
      },
    ],
  },
  {
    group: "Product Management",
    links: [
      {
        to: "/seller/products",
        icon: Package,
        label: "All Products",
      },
      {
        to: "/seller/products/add",
        icon: PackagePlus,
        label: "Add Product",
      },
    ],
  },
  {
    group: "Order Management",
    links: [
      {
        to: "/seller/orders",
        icon: ListOrdered,
        label: "Orders",
      },
    ],
  },
  {
    group: "Settings",
    links: [
      {
        to: "/seller/profile",
        icon: User,
        label: "Profile",
      },
    ],
  },
];

export function SellerSideBar({ onClose }) {
  return (
    <div className="h-full w-full bg-white border-r">
      <SidebarHeader>
        <div className="flex justify-between items-center px-4 py-2">
          <h1 className="text-xl font-bold">Seller Panel</h1>
          {/* Close button on mobile */}
          <button
            className="md:hidden text-gray-500"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((group, idx) => (
          <SidebarGroup key={idx} label={group.group}>
            <div className="space-y-1">
              {group.links.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/seller/products"}
                  aria-label={label}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </div>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </div>
  );
}
