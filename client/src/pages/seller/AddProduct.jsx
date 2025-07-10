import { addProduct } from "@/api/productApi";
import { showToast } from "@/components/shared/showToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import appUtils from "@/lib/appUtils";
import {
  categoriesThunk,
  sizeThunk,
  subCategoriesThunk,
} from "@/store/thunks/productMetaThunk";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";

export const AddProduct = () => {
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dispatch, selector } = appUtils();

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    offerPrice: "",
    category: "",
    subCategory: "",
    stock: "",
    sizes: [],
  });

  useEffect(() => {
    dispatch(categoriesThunk());
    dispatch(subCategoriesThunk());
    dispatch(sizeThunk());
  }, [dispatch]);

  const { categories, subCategories, sizes } = selector(
    (state) => state.productMetaData
  );

  const handleFileChange = (index, file) => {
    const previewUrl = URL.createObjectURL(file);
    const updatedImages = [...preview];
    updatedImages[index] = { preview: previewUrl, file };
    setPreview(updatedImages);
  };

  const toggleSize = (sizeId) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(sizeId)
        ? prev.sizes.filter((id) => id !== sizeId)
        : [...prev.sizes, sizeId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    preview.forEach((image) => {
      if (image?.file) {
        formDataToSend.append("productImages", image.file);
      }
    });

    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("productDescription", formData.productDescription);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("offerPrice", formData.offerPrice);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("stock", formData.stock);

    formData.sizes.forEach((sizeId) => {
      formDataToSend.append("sizes", sizeId);
    });

    try {
      const result = await addProduct(formDataToSend);
      showToast({
        message: "Product added successfully",
        type: "success",
        actionLabel: "View Product",
        onAction: () => {
          // Optionally navigate to product page
        },
      });
      // Optional: Reset form or preview
    } catch (error) {
      console.error("❌ Error:", error.message);
      showToast({
        message: "Failed to add product",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 bg-white rounded-xl shadow-md p-6"
      >
        {/* Image Upload */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Product Images</Label>
          <div className="flex flex-wrap items-center gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image-${index}`}
                  className="w-24 h-24 border-2 border-dashed border-muted rounded-md flex items-center justify-center cursor-pointer hover:border-primary transition overflow-hidden"
                >
                  <input
                    type="file"
                    id={`image-${index}`}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                  {preview[index]?.preview ? (
                    <img
                      src={preview[index].preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-muted-foreground" />
                  )}
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-1">
          <Label htmlFor="product-name">Product Name</Label>
          <Input
            id="product-name"
            placeholder="Type product name"
            required
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="product-description">Product Description</Label>
          <Textarea
            id="product-description"
            placeholder="Type detailed description"
            rows={4}
            value={formData.productDescription}
            onChange={(e) =>
              setFormData({
                ...formData,
                productDescription: e.target.value,
              })
            }
          />
        </div>

        {/* Category, Subcategory, Stock */}
        <section className="flex gap-12">
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="subCategory">Subcategory</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, subCategory: value })
              }
            >
              <SelectTrigger id="subCategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subCategories?.map((sub) => (
                  <SelectItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter stock"
              required
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
          </div>
        </section>

        {/* Sizes */}
        <div className="space-y-1">
          <Label>Available Sizes</Label>
          <div className="flex gap-2 flex-wrap">
            {sizes?.map((size) => (
              <Button
                key={size._id}
                type="button"
                variant="outline"
                onClick={() => toggleSize(size._id)}
                className={`px-4 py-2 ${
                  formData.sizes.includes(size._id)
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : ""
                }`}
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Prices */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 space-y-1 min-w-[120px]">
            <Label htmlFor="product-price">Product Price</Label>
            <Input
              id="product-price"
              type="number"
              placeholder="0"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className="flex-1 space-y-1 min-w-[120px]">
            <Label htmlFor="offer-price">Offer Price</Label>
            <Input
              id="offer-price"
              type="number"
              placeholder="0"
              required
              value={formData.offerPrice}
              onChange={(e) =>
                setFormData({ ...formData, offerPrice: e.target.value })
              }
            />
          </div>
        </div>

        {/* Submit */}
        <div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};
