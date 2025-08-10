import { useEffect, useState } from 'react';
import ProductCard from '../components/productCard.tsx';

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
        `http://localhost:5001/api/products/products-frontend?pageNumber=${page}&pageSize=${pageSize}`
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
      <div className="store-ad-block">
        <img src="https://img.freepik.com/free-vector/people-choosing-products-grocery-store-trolley-vegetables-basket-flat-vector-illustration-shopping-supermarket-concept_74855-10122.jpg?t=st=1754661651~exp=1754665251~hmac=a799647aaa0a8d564cc3c33a9f1b3495090913fefb12c3434425b0ff2cb16c76&w=720" alt="Market Logo" className="store-ad" />
        <div className="store-ad-text">
          <h3>Buy the food for those who need it <img src="https://img.icons8.com/?size=32&id=V4c6yYlvXtzy&format=png&color=000000" alt="heart" /></h3>
        </div>
      </div>

      {loading && <div className="loading">Loading products...</div>}
      
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