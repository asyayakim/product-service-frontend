import { useEffect, useState } from 'react';
import Search from '../components/Search.tsx';

interface ProductCardProps {
  productId: string;
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

const ProductCard = ({
  productId,
  imageUrl,
  productName,
  brand,
  unitPrice,
  store
}: ProductCardProps) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('no-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={imageUrl}
          alt={productName}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=No+Image';
          }}
        />
      </div>
      <div className="product-details">
        <div className="brand">{brand}</div>
        <h3 className="product-name">{productName}</h3>
        <div className="price">{formatPrice(unitPrice)} kr</div>
        <div className="store-info">
          <img
            src={store.logo}
            alt={store.name}
            className="store-logo"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30?text=Store';
            }}
          />
          <span>{store.name}</span>
        </div>
      </div>
    </div>
  );
};

interface ApiProduct {
  productId: string;
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

// Pagination state interface
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
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 20,  // Load 20 products at a time
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
      
      // Update products state
      if (isInitialLoad) {
        setProducts(data);
      } else {
        setProducts(prev => [...prev, ...data]);
      }
      
      // Update pagination state
      setPagination(prev => ({
        ...prev,
        page,
        hasMore: data.length === pageSize
      }));
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1, pagination.pageSize);
  }, []);

  const handleLoadMore = () => {
    fetchProducts(pagination.page + 1, pagination.pageSize);
  };

  return (
    <main className="main-view">
      <h1>Product Search</h1>
      <p className="subtitle">Find products by search</p>
      <Search />
      
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