import { products } from "@/assets/frontend_assets/assets";
import { Checkbox } from "@/components/ui/checkbox";

const FilterSidebar = ({ filters, onFilterChange }) => {
  const categories = [...new Set(products.map((product) => product.category))];
  const subCategories = [...new Set(products.map((product) => product.subCategory))];

  const handleChange = (section, value) => {
    onFilterChange(section, value);
  };

  const renderOptions = (label, section, options) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">{label}</h3>
      {options.map((opt) => (
        <div key={opt} className="flex items-center gap-2 py-1">
          <Checkbox
            id={`${section}-${opt}`}
            checked={filters[section].includes(opt)}
            onCheckedChange={() => handleChange(section, opt)}
          />
          <label htmlFor={`${section}-${opt}`} className="text-sm">
            {opt}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 border rounded-lg bg-white shadow w-[90%] md:w-[250px]">
      {renderOptions("Category", "category", categories)}
      {renderOptions("Type", "subCategory", subCategories)
}
    </div>
  );
};

export default FilterSidebar;
