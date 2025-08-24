import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/productCard';
import { API_BASE_URL } from '../apiConfig';
import CategoryFilter from '../components/main/CategoryFilter';
import PriceRangeFilter from '../components/main/PriceRangeFilter';

interface ApiProduct {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
  unitPrice: number;
  description: string;
  category: string;
  store: {
    name: string;
    logo: string;
  };
}

interface PaginationState {
  page: number;
  pageSize: number;
  hasMore: boolean;
}

interface PriceRange {
  min: number;
  max: number;
}

export default function AllProducts() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(category || '');
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 20,
    hasMore: true
  });

  const fetchProducts = async (page: number, pageSize: number, categoryFilter: string = '', priceFilter: PriceRange | null = null) => {
    try {
      const isInitialLoad = page === 1;
      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      let url = `${API_BASE_URL}/api/products/products-by-category?pageNumber=${page}&pageSize=${pageSize}`;
      if (categoryFilter) {
        url += `&category=${encodeURIComponent(categoryFilter)}`;
      }
      if (priceFilter) {
        url += `&minPrice=${priceFilter.min}&maxPrice=${priceFilter.max}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (isInitialLoad) {
        setProducts(data);
      } else {
        setProducts(prev => [...prev, ...data]);
      }

      setPagination(prev => ({
        ...prev,
        page,
        hasMore: data.length === pageSize
      }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while fetching products');
      }
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setActiveCategory(category || '');
    fetchProducts(1, pagination.pageSize, category || '', priceRange);
  }, [category, priceRange]);

  const handleLoadMore = () => {
    fetchProducts(pagination.page + 1, pagination.pageSize, activeCategory, priceRange);
  };

  const handleCategoryChange = (newCategory: string) => {
    const updatedCategory = activeCategory === newCategory ? '' : newCategory;
    setActiveCategory(updatedCategory);

    if (updatedCategory) {
      navigate(`/all-products/${updatedCategory}`);
    } else {
      navigate('/all-products');
    }
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearCategoryFilter = () => {
    setActiveCategory('');
    navigate('/all-products');
  };

  const clearPriceFilter = () => {
    setPriceRange(null);
  };

  const clearAllFilters = () => {
    setActiveCategory('');
    setPriceRange(null);
    navigate('/all-products');
  };

  const hasActiveFilters = activeCategory || priceRange;

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-1/4">
          <div className="sticky top-6">
            <CategoryFilter 
              onCategoryChange={handleCategoryChange} 
              activeCategory={activeCategory}
            />
            <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} />
            
            {hasActiveFilters && (
              <div className="p-3 mt-4 border rounded bg-gray-50">
                <h4 className="mb-3 widget-title h5">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {activeCategory && (
                    <span className="px-2 py-1 text-sm bg-blue-100 rounded-full">
                      Category: {activeCategory}
                      <button 
                        onClick={clearCategoryFilter}
                        className="ml-1 text-gray-600 hover:text-blue-800"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {priceRange && (
                    <span className="px-2 py-1 text-sm bg-green-100 rounded-full">
                      Price: ${priceRange.min} - ${priceRange.max}
                      <button 
                        onClick={clearPriceFilter}
                        className="p-2 ml-1 text-green-600 hover:text-green-800"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                </div>
                <button 
                  onClick={clearAllFilters}
                  className="w-full px-3 py-2 mt-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
              Error: {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 sm:p-3 sm:gap-12 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                  <div key={product.productId}>
                    <ProductCard
                      productId={product.productId}
                      imageUrl={product.imageUrl}
                      productName={product.productName}
                      brand={product.brand}
                      unitPrice={product.unitPrice}
                      description={product.description}
                      category={product.category}
                      store={product.store}
                    />
                  </div>
                ))}
              </div>
              
              {pagination.hasMore && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}