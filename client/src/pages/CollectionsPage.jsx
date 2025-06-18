import { useState, useEffect } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import { products as dummyProducts } from "@/assets/frontend_assets/assets";
import NoProductMatch from "@/components/NoProductMatch";
import { useSearch } from "@/context/SearchContext";

const CollectionPage = () => {
  const { searchQuery  } = useSearch();
  const [filters, setFilters] = useState({ category: [], subCategory: [] });
  const [sortOption, setSortOption] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Toggle for mobile


  // Initial product load
  useEffect(() => {
    const loadProducts = () => {
      const products = dummyProducts;
      setAllProducts(products);
      setFilteredProducts(products);
    };
    loadProducts();
  }, []);

  // Filtering + Sorting logic
  useEffect(() => {
    let products = [...allProducts];

    // Apply category/subcategory filters
    if (filters.category.length)
      products = products.filter((p) => filters.category.includes(p.category));
    if (filters.subCategory.length)
      products = products.filter((p) =>
        filters.subCategory.includes(p.subCategory)
      );

       // 🟡 Live search filtering
       if(searchQuery.trim()) {
        products = products.filter((p) => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
       }
//  Sorting
    if (sortOption === "lowToHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      products.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(products);
  }, [filters, sortOption, allProducts, searchQuery]);

  // Checkbox toggle handler
  const handleFilterChange = (section, value) => {
    setFilters((prev) => {
      const updated = prev[section].includes(value)
        ? prev[section].filter((v) => v !== value)
        : [...prev[section], value];
      return { ...prev, [section]: updated };
    });
  };

  // Auto-close filter on outside click (only when open)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".mobile-filter-toggle") && !e.target.closest(".mobile-filter-panel")) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">
          All Collections
        </h2>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4 mobile-filter-toggle">
        <div
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <h3 className="text-base font-semibold">Filters</h3>
          <span className="text-xl">{isFilterOpen ? "▲" : "▼"}</span>
        </div>

        {isFilterOpen && (
          <div className="mobile-filter-panel mt-3">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length === 0 && <NoProductMatch />}
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
