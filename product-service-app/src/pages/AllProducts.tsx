import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/productCard';
import { API_BASE_URL } from '../apiConfig';
import CategoryFilter from '../components/main/CategoryFilter';
import PriceRangeFilter from '../components/main/PriceRangeFilter';
import SortingDropdown, { type SortOption } from '../components/search/SortingDropdown';

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
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 20,
    hasMore: true
  });

  const fetchProducts = async (
    page: number,
    pageSize: number,
    categoryFilter: string = '',
    priceFilter: PriceRange | null = null,
    sortOption: SortOption = 'featured'
  ) => {
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
      if (sortOption !== 'featured') {
        url += `&sortBy=${sortOption}`;
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
    fetchProducts(1, pagination.pageSize, category || '', priceRange, sortBy);
  }, [category, priceRange, sortBy]);

  const handleLoadMore = () => {
    fetchProducts(pagination.page + 1, pagination.pageSize, activeCategory, priceRange, sortBy);
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

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearCategoryFilter = () => {
    setActiveCategory('');
    navigate('/all-products');
  };

  const clearPriceFilter = () => {
    setPriceRange(null);
  };

  const clearSortFilter = () => {
    setSortBy('featured');
  };

  const clearAllFilters = () => {
    setActiveCategory('');
    setPriceRange(null);
    setSortBy('featured');
    navigate('/all-products');
  };

  const hasActiveFilters = activeCategory || priceRange || sortBy !== 'featured';

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
              <div className="p-4 mt-4 border rounded-lg bg-gray-50">
                <h4 className="mb-3 text-lg font-semibold text-gray-800">Active Filters</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeCategory && (
                    <span className="flex items-center px-4 py-2 text-sm bg-gray-200 rounded-full">
                      Category: {activeCategory}
                      <button
                        onClick={clearCategoryFilter}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {priceRange && (
                    <span className="flex items-center px-4 py-2 text-sm bg-gray-200 rounded-full">
                      Price: ${priceRange.min} - ${priceRange.max}
                      <button
                        onClick={clearPriceFilter}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {sortBy !== 'featured' && (
                    <span className="flex items-center px-4 py-2 text-sm bg-gray-200 rounded-full">
                      Sort: {
                        sortBy === 'price_asc' ? 'Price: Low to High' :
                          sortBy === 'price_desc' ? 'Price: High to Low' :
                            sortBy === 'name_asc' ? 'Name: A-Z' : 'Name: Z-A'
                      }
                      <button
                        onClick={clearSortFilter}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="w-full px-3 py-2 text-sm text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeCategory ? `${activeCategory} Products` : 'All Products'}
            </h2>

            <SortingDropdown sortBy={sortBy} onSortChange={handleSortChange} />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
              Error: {error}
              <button
                onClick={() => fetchProducts(1, pagination.pageSize, activeCategory, priceRange, sortBy)}
                className="block px-4 py-2 mx-auto mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className="p-8 text-center bg-gray-100 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map(product => (
                      <div key={product.productId} className="transition-transform duration-300 hover:scale-105">
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
                        className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loadingMore ? (
                          <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          'Load More Products'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}