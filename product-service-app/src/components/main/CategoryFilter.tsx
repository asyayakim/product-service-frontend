import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
const CategoryFilter = ({ onCategoryChange }: { onCategoryChange: (category: string) => void }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const categories = [
    {
      id: 'clothing',
      name: 'Clothing',
      subcategories: ["Men's Wear", "Women's Wear", "Kids' Clothing", "Accessories"]
    },
    {
      id: 'electronics',
      name: 'Electronics',
      subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"]
    },
    {
      id: 'home',
      name: 'Home & Kitchen',
      subcategories: ["Furniture", "Kitchen Appliances", "Home Decor", "Bedding"]
    }
  ];

  return (
    <div className="p-3 mb-4 border rounded category-widget widget-item bg-light">
      <h3 className="mb-3 widget-title h5">Categories</h3>
      <ul className="mb-0 category-tree list-unstyled">
        {categories.map(category => (
          <li key={category.id} className="mb-2 category-item">
            <div 
              className="cursor-pointer d-flex justify-content-between align-items-center category-header" 
              onClick={() => toggleCategory(category.id)}
              style={{ cursor: 'pointer' }}
            >
              <span className="category-link fw-medium">{category.name}</span>
              <span className="category-toggle">
                {expandedCategories[category.id] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            <ul className={`subcategory-list list-unstyled ps-3 mt-2 ${expandedCategories[category.id] ? 'd-block' : 'd-none'}`}>
              {category.subcategories.map(sub => (
                <li key={sub} className="mb-1">
                  <button 
                    className="p-0 subcategory-link btn btn-link text-decoration-none text-start"
                    onClick={(e) => {
                      e.preventDefault();
                      onCategoryChange(sub);
                    }}
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryFilter;