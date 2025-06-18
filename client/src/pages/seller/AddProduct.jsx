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
import { ImagePlus } from "lucide-react";
import { useState } from "react";

const categories = ["Men", "Women", "Kids"];
const subCategories = ["TopWear", "BottomWear", "WinterWear"];
const sizes = ["S", "M", "L", "XL", "XXL"];

export const AddProduct = () => {
  const [preview, setPreview] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);

  const handleFileChange = (index, file) => {
    const previewUrl = URL.createObjectURL(file);
    const updatedImages = [...preview];
    updatedImages[index] = { preview: previewUrl, file };
    setPreview(updatedImages);
  };
  const toggleSize = (size) => {
    setSelectedSize((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="py-10 flex justify-center ">
      <form className="w-full max-w-xl space-y-6 bg-white rounded-xl shadow-md p-6">
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
          <Input id="product-name" placeholder="Type product name" required />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="product-description">Product Description</Label>
          <Textarea
            id="product-description"
            placeholder="Type detailed description"
            rows={4}
          />
        </div>

        {/* Category */}
        <section className="flex gap-12">
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="category">subCategory</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
       {/* Stock */}
       <div className="space-y-1">
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" type="number" placeholder="Enter stock" />
       </div>
        </section>
        {/* Sizes */}
        <div className="space-y-1">
          <Label>Available Sizes</Label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant="outline"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 ${
                  selectedSize.includes(size)
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : ""
                }`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Prices */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 space-y-1 min-w-[120px]">
            <Label htmlFor="product-price">Product Price</Label>
            <Input id="product-price" type="number" placeholder="0" required />
          </div>
          <div className="flex-1 space-y-1 min-w-[120px]">
            <Label htmlFor="offer-price">Offer Price</Label>
            <Input id="offer-price" type="number" placeholder="0" required />
          </div>
        </div>

        {/* Submit */}
        <div>
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};
