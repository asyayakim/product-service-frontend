import { useEffect, useState } from 'react';
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


export default function AllProducts() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(category || '');
  const navigate = useNavigate();


  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 20,
    hasMore: true
  });

  const fetchProducts = async (page: number, pageSize: number, categoryFilter: string = '') => {
    try {
      const isInitialLoad = page === 1;
      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      let url = `${API_BASE_URL}/api/products/products-frontend?pageNumber=${page}&pageSize=${pageSize}`;

      if (categoryFilter) {
        url = `${API_BASE_URL}/api/products/products-by-category?category=${encodeURIComponent(categoryFilter)}&pageNumber=${page}&pageSize=${pageSize}`;
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

    setActiveFilter(category || '');
    fetchProducts(1, pagination.pageSize, category || '');
  }, [category]);

  const handleLoadMore = () => {
    fetchProducts(pagination.page + 1, pagination.pageSize, activeFilter);
  };

  const handleCategoryChange = (newFilter: string) => {
    const updatedFilter = activeFilter === newFilter ? '' : newFilter;
    setActiveFilter(updatedFilter);

    if (updatedFilter) {
      navigate(`/all-products/${encodeURIComponent(updatedFilter)}`);
    } else {
      navigate('/all-products');
    }

    fetchProducts(1, pagination.pageSize, updatedFilter);
  };


  const clearCategoryFilter = () => {
    setActiveFilter('');
    navigate('/all-products');
    fetchProducts(1, pagination.pageSize, '');
  };


  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-1/4">
          <div className="sticky top-6">
            <CategoryFilter
              onCategoryChange={handleCategoryChange}
              activeCategory={activeFilter}
            />
            {/* <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} /> */}


          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {activeFilter ? `Filtered by: ${activeFilter}` : 'All Products'}
            </h2>


            {activeFilter && (
              <button
                onClick={clearCategoryFilter}
                className="px-4 py-2 text-sm text-gray-600 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Clear Filter
              </button>
            )}
          </div>

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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:p-12 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
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
};

