// utils/formatResponse.js

// 🧍 User Formatter
export const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profilePicture: user.profilePicture || null,
  bio: user.bio || "",
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// 🧑‍💼 Seller Formatter
export const formatSellerResponse = (seller) => ({
  id: seller._id,
  storeName: seller.storeName,
  email: seller.email,
  phone: seller.phone || null,
  avatar: seller.avatar || null,
  address: seller.address || null,
  description: seller.description || "",
  createdAt: seller.createdAt,
  updatedAt: seller.updatedAt,
});

// 📦 Product Formatter
export const formatProductResponse = (product) => ({
  id: product._id,
  name: product.name,
  description: product.description,
  price: product.price,
  offerPrice: product.offerPrice || null,
  category: product.category,
  size: product.size || null,
  images: product.images || [], // array of URLs or objects
  stock: product.stock,
  ratings: product.ratings || [],
  seller: product.seller && {
    id: product.seller._id,
    storeName: product.seller.storeName,
  },
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

// 🛒 Order Formatter
export const formatOrderResponse = (order) => ({
  id: order._id,
  user: order.user && {
    id: order.user._id,
    name: order.user.name,
    email: order.user.email,
  },
  products: order.products.map((item) => ({
    id: item._id,
    title: item.title,
    quantity: item.quantity,
    price: item.price,
  })),
  shippingInfo: order.shippingInfo && {
    address: order.shippingInfo.address,
    city: order.shippingInfo.city,
    postalCode: order.shippingInfo.postalCode,
    country: order.shippingInfo.country,
  },
  paymentMethod: order.paymentMethod,
  totalPrice: order.totalPrice,
  orderStatus: order.orderStatus,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});
