import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AllProducts = () => {
  const products = [
    {
      id: 1,
      name: "Casual Shoes",
      category: "Shoes",
      offerPrice: 999,
      inStock: true,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
    },
    {
      id: 2,
      name: "Casual Shoes",
      category: "Shoes",
      offerPrice: 999,
      inStock: false,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
    },
    {
      id: 3,
      name: "Casual Shoes",
      category: "Shoes",
      offerPrice: 999,
      inStock: true,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
    },
  ];

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">All Products</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-800 text-base font-semibold">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 hidden md:table-cell">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-base divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-md border object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 hidden md:table-cell">
                  ${product.offerPrice}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
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
    </div>
  );
};

export default AllProducts;
