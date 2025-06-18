export const formatUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const formatProductResponse = (product) => {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};


export const formatOrderResponse = (order) => {
  return {
    id: order._id,
    userId: order.userId,
    products: order.products,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};
