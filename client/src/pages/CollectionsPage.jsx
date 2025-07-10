import { useState, useEffect } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import NoProductMatch from "@/components/NoProductMatch";
import { useSearch } from "@/context/SearchContext";
import appUtils from "@/lib/appUtils";
import { getAllProductsThunk } from "@/store/thunks/productThunk";

const CollectionPage = () => {
  const { searchQuery } = useSearch();
  const [filters, setFilters] = useState({ category: [], subCategory: [] });
  const [sortOption, setSortOption] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { selector, dispatch } = appUtils();
  const { products, loading, error } = selector((state) => state.products);

  // Load products once on mount
  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  // Filter and sort products based on UI state
  useEffect(() => {
    let filtered = [...products];

    if (filters.category.length > 0) {
      filtered = filtered.filter((p) => filters.category.includes(p.category));
    }

    if (filters.subCategory.length > 0) {
      filtered = filtered.filter((p) =>
        filters.subCategory.includes(p.subCategory)
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortOption, searchQuery]);

  // Checkbox toggle handler
  const handleFilterChange = (section, value) => {
    setFilters((prev) => {
      const updated = prev[section].includes(value)
        ? prev[section].filter((v) => v !== value)
        : [...prev[section], value];
      return { ...prev, [section]: updated };
    });
  };

  // Close filter on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".mobile-filter-toggle") &&
        !e.target.closest(".mobile-filter-panel")
      ) {
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
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <p className="col-span-full text-center">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <NoProductMatch />
          ) : (
            filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
