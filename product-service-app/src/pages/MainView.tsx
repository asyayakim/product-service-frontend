import { useEffect, useState } from 'react';
import ProductCard from '../components/productCard';
import AddSection from '../components/addvertisment/AddSection';
import BestSellers from '../components/addvertisment/BestSellers';
import { API_BASE_URL } from '../apiConfig';
import PromoCards from '../components/addvertisment/PromoCards';

interface ApiProduct {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
  unitPrice: number;
  description: string;
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

export default function MainView() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  return (
    <main className="main-view">
      <AddSection />
      <BestSellers />
      <PromoCards />

      {loading && <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </div>}
      
      {error && (
        <div className="error">
          Error: {error}
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}
      
      {!loading && !error && (
        <>
        
          <div className="products-grid">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard
                  key={product.productId}
                  {...product}
                />
              ))
            ) : (
              <div className="no-products">No products found</div>
            )}
          </div>
          
          {pagination.hasMore && (
            <div className="load-more-container">
              <button 
                onClick={handleLoadMore} 
                disabled={loadingMore}
                className="load-more-button"
              >
                {loadingMore ? (
                  <span className="loading-indicator">Loading...</span>
                ) : (
                  'Load More Products'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}