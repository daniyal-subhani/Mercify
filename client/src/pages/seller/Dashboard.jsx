import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PackageCheck, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 space-y-2">
            <PackageCheck className="text-indigo-500" />
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-muted-foreground">Total: 120</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <ShoppingCart className="text-green-500" />
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-muted-foreground">Total: 87</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <Users className="text-yellow-500" />
            <h2 className="text-xl font-semibold">Customers</h2>
            <p className="text-muted-foreground">Total: 56</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
