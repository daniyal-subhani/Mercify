export const calculateCartTotals = (cartItems, fetchProductsFromDB) => {
  let subtotal = 0;
  const items = cartItems.map((item) => {
    const product = fetchProductsFromDB.find(
      (p) => p._id.toString() === item.productId
    );
    const price = product.price;
    const quantity = item.quantity;
    const total = quantity * price;
    // const subtotal = subtotal + total
    subtotal += total;
    return {
      productId: product._id,
      quantity,
      price,
      total,
      seller: product.seller._id
    }
  });
  const tax = Math.round(subtotal * 0.02)
  const shipping = 0
  const cartTotal = subtotal + tax + shipping
  return {
    tax,
    shipping,
    cartTotal,
    subtotal,
    items
  }
};
