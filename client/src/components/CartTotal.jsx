import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from './ui/button';
import { RouteCheckout } from '@/helpers/routesName';
import appUtils from '@/lib/appUtils';
import { products } from '@/assets/frontend_assets/assets';

const CartTotal = ({buttonText}) => {
    const {navigate, selector} = appUtils()
    const cart = selector(state => state.cart.cartItems)
    const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div>
        <Card className="w-full h-[400px] mx-auto   max-w-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>SubTotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping fee</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (2%)</span>
             <span>${Math.round(totalPrice * 0.02)}</span>

            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t mt-4">
              <span>Total</span>
              <span>${Math.round(totalPrice * 1.02)}</span>

            </div>
          </div>

          <Button onClick={()=> navigate(RouteCheckout)} className="w-full mt-6"> {buttonText}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CartTotal
