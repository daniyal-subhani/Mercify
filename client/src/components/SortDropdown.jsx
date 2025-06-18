import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";

const SortDropdown = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowDownUp className="w-4 h-4" />
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
          <SelectItem value="highToLow">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;
