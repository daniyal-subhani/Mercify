import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { RouteCheckout } from "@/helpers/routesName";
import appUtils from "@/lib/appUtils";
import { calculateCartTotals } from "@/lib/cartUtils";

const CartTotal = ({ buttonText }) => {
  const { navigate, selector } = appUtils();
  const cart = selector((state) => state.cart.cartItems);

  // Defensive check to prevent runtime error
  const safeCart = Array.isArray(cart) ? cart : [];

  const { subTotal, tax, shipping, total } = useMemo(
  () => calculateCartTotals(safeCart),
  [safeCart]
);

  return (
    <Card className="w-full h-[300px] mx-auto max-w-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span>SubTotal</span>
            <span>${subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping fee</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t mt-4">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="mx-auto w-full">
            <Button onClick={() => navigate(RouteCheckout)}>{buttonText}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartTotal;
