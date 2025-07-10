import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.GET_SELLER_PRODUCTS}`,
          { withCredentials: true }
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch seller products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (products.length === 0) return <p className="text-center py-10">No products found.</p>;

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">All Products</h2>

      {/* Table layout for medium and larger screens */}
      <div className="hidden md:block overflow-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-800 text-sm font-semibold">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Offer Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    className="w-14 h-14 rounded-md border object-cover"
                  />
                  <span className="font-medium">{product.productName}</span>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">${product.offerPrice}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="px-6 py-4">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.productName}
                className="w-16 h-16 rounded-md object-cover border"
              />
              <div>
                <h3 className="text-base font-semibold">{product.productName}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </div>
            <p className="text-sm">Price: ${product.price}</p>
            <p className="text-sm">Offer: ${product.offerPrice}</p>
            <p className="text-sm">
              Stock:{" "}
              <span
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
              </span>
            </p>
            <p className="text-sm line-clamp-2">Description: {product.description}</p>
            <p className="text-xs text-gray-500">
              Added: {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <Button  variant="outline" size="sm" disabled>
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
