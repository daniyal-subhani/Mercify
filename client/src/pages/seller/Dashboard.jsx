import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PackageCheck, ShoppingCart, Users } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { backendRoutes } from "@/helpers/backendRoutes";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, uniqueCustomers: 0 });
  const [loading, setLoading] = useState(true);
  const sellerId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get(`${backendRoutes.DASHBOARD_DATA.BASE}${backendRoutes.DASHBOARD_DATA.GET_SELLER_DASHBOARD}`);
        setStats(res.data.data);

      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

     fetchStats();
  }, []);

  if (loading) return <p className="p-6 text-center text-muted-foreground">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 space-y-2">
            <PackageCheck className="text-indigo-500" />
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-muted-foreground">Total: {stats.totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <ShoppingCart className="text-green-500" />
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-muted-foreground">Total: {stats.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <Users className="text-yellow-500" />
            <h2 className="text-xl font-semibold">Customers</h2>
            <p className="text-muted-foreground">Total: {stats.uniqueCustomers}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
