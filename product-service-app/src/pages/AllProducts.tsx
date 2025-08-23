import { useEffect, useState } from 'react';
import ProductCard from '../components/productCard.tsx';
import { API_BASE_URL } from '../apiConfig';
// import PriceRangeFilter from '../components/main/PriceRangeFilter.tsx';
// import CategoryFilter from '../components/main/CategoryFilter.tsx';
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
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [viewMode, setViewMode] = useState('grid');
  // const [searchQuery, setSearchQuery] = useState('');
  // const [sortBy, setSortBy] = useState('featured');
  // const [priceRange, setPriceRange] = useState('all');
  //const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 20,
    hasMore: true
  });

  const fetchProducts = async (page: number, pageSize: number) => {
    try {
      const isInitialLoad = page === 1;
      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(
        `${API_BASE_URL}/api/products/products-frontend?pageNumber=${page}&pageSize=${pageSize}`
      );

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
    fetchProducts(1, pagination.pageSize);
  }, []);

  const handleLoadMore = () => {
    fetchProducts(pagination.page + 1, pagination.pageSize);
  };

  // const handlePriceRangeChange = (min: any, max: any) => {
  //   setActiveFilters(prev => [
  //     ...prev.filter(f => !f.startsWith('$')),
  //     `$${min} to $${max}`
  //   ]);
  // };

  // const handleCategoryChange = (category: string) => {
  //   setActiveFilters(prev => [
  //     ...prev.filter(f => !f.includes('Category')),
  //     category
  //   ]);
  // };

  // const removeFilter = (filterToRemove: string) => {
  //   setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
  // };

  // const clearAllFilters = () => {
  //   setActiveFilters([]);
  // };

  return (
<div className="container px-4 py-6 mx-auto">

  <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar with filters */}
  <div className="flex flex-col gap-6 lg:w-1/4">
      {/* <div className="sticky top-6">
            <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} />
            <CategoryFilter onCategoryChange={handleCategoryChange} />
          </div> */}
        </div> 

        {/* Main content */}
 <div className="flex-1">
      

          {/* Product Grid */}
          {loading && (
            <div className="py-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="text-center alert alert-danger">
              <p>Error: {error}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <section className='py-8'>
              {products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map(product => (
                      <div
                        key={product.productId}
                      >
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
                    <div className="mt-8 text-center load-more-container">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loadingMore ? (
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </div>
                        ) : (
                          'Load More Products'
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12 text-center bg-gray-100 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-800">No products found</h4>
                  <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}