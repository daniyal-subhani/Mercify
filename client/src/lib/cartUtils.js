export const calculateCartTotals = (cartItems) => {
  if (!Array.isArray(cartItems)) return { subTotal: 0, tax: 0, shipping: 0, total: 0 };

  const subTotal = cartItems.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const tax = Math.round(subTotal * 0.02);
  const shipping = 0;
  const total = Math.round(subTotal + tax + shipping);

  return { subTotal, tax, shipping, total };
};
