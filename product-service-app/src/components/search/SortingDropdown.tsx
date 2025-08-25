
export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

interface SortingDropdownProps {
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const SortingDropdown = ({ sortBy, onSortChange }: SortingDropdownProps) => {
  return (
    <div className="flex items-center space-x-2">
      <h6 className="font-semibold text-gray-800">Sort By:</h6>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="featured">Featured</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A-Z</option>
        <option value="name_desc">Name: Z-A</option>
      </select>
    </div>
  );
};

export default SortingDropdown;