import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../apiConfig';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  activeCategory?: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

const CategoryFilter = ({ onCategoryChange, activeCategory }: CategoryFilterProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/categories`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const categoryData = await response.json();

        const formattedCategories: Category[] = categoryData.map((cat: string, index: number) => ({
          id: `category-${index}`,
          name: cat,
          subcategories: []
        }));

        setCategories(formattedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Category fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  if (loading) {
    return (
      <div className="p-3 mb-4 border rounded category-widget widget-item bg-light">
        <h3 className="mb-3 widget-title h5">Categories</h3>
        <div className="py-2 text-center">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 mb-4 border rounded category-widget widget-item bg-light">
        <h3 className="mb-3 widget-title h5">Categories</h3>
        <div className="py-2 text-center text-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-3 mb-4 border rounded category-widget widget-item bg-light">
      <h3 className="mb-3 widget-title h5">Categories</h3>
      <ul className="mb-0 category-tree list-unstyled">
        {categories.map(category => (
          <li key={category.id} className="mb-2 category-item">
            <div
              className="cursor-pointer d-flex justify-content-between align-items-center category-header"
              onClick={() => toggleCategory(category.id)}
            >
              <span
                className={`category-link fw-medium cursor-pointer 
    ${activeCategory === category.name ? 'text-primary fw-bold' : ''}`}
                onClick={() => onCategoryChange(category.name)}
              >
                {category.name}
              </span>

            </div>
            <ul className={`subcategory-list list-unstyled ps-3 mt-2 ${expandedCategories[category.id] ? 'd-block' : 'd-none'}`}>
              {category.subcategories.map(sub => (
                <li key={sub} className="mb-1">
                  <button
                    className={`p-0 subcategory-link btn btn-link text-decoration-none text-start ${activeCategory === sub ? 'text-primary fw-bold' : ''}`}
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