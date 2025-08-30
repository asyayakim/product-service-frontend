import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import { API_BASE_URL } from '../../apiConfig';
import Loading from '../elements/Loading';

interface Category {
  category: string;
  imageUrl: string;
  totalProductsByCategory: number;
}

export default function PromoCardsSection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/categories-with-total-products`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/all-products/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <section id="promo-cards" className="py-16 bg-gradient-to-r from-gray-100 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center text-red-500">
            <p>Error loading categories: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 mt-4 text-white transition-colors bg-gray-800 rounded-md hover:bg-gray-900"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const featuredCategory = categories.length > 0 ? categories[0] : null;
  const otherCategories = categories.length > 1 ? categories.slice(1, 5) : [];

  return (
    <section id="promo-cards" className="py-1">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredCategory && (
  <div 
    className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-2xl md:flex-row"
    data-aos="fade-right"
    data-aos-delay="200"
  >
    <div className="flex flex-col justify-center flex-1 p-6 md:p-8">
      <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-white bg-green-700 rounded-full">
        Popular Categories
      </span>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 capitalize md:text-3xl">{featuredCategory.category}</h2>
      <p className="mb-6 text-gray-700">
        {featuredCategory.totalProductsByCategory} premium products available
      </p>
      <button 
        onClick={() => handleCategoryClick(featuredCategory.category)}
        className="flex items-center mt-auto font-semibold text-gray-900 hover:underline group/button"
      >
        Explore Collection 
        <BiArrowToRight className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
      </button>
    </div>
    <div className="flex items-center justify-center bg-white md:w-2/5">
      <div className="relative w-full h-56 md:h-64">
        <img 
          src={featuredCategory.imageUrl} 
          alt={featuredCategory.category}
          className="object-contain w-full h-full p-4"
        />
      </div>
    </div>
  </div>
)}

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
  {otherCategories.map((category, index) => (
    <div
      key={category.category}
      className="flex overflow-hidden bg-white border border-gray-200 rounded-2xl group h-28 sm:h-32"
      data-aos="fade-up"
      data-aos-delay={300 + (index * 100)}
    >
      <div className="flex flex-col justify-center flex-1 p-4 sm:p-5">
  
        <h4 className="mb-1 text-sm font-bold text-gray-900 capitalize sm:text-base">{category.category}</h4>
        <p className="mb-2 text-xs text-gray-700 sm:text-sm">{category.totalProductsByCategory} products</p>
        <button 
          onClick={() => handleCategoryClick(category.category)}
          className="flex items-center text-xs font-semibold text-gray-900 hover:underline sm:text-sm"
        >
          Shop Now <BiArrowToRight className="ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <div className="flex items-center justify-center w-1/3 bg-white">
        <div className="relative w-full h-20">
          <img 
            src={category.imageUrl} 
            alt={category.category}
            className="object-contain w-full h-full p-2"
          />
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </section>
  );
}