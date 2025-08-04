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
  description,
  store
}: ProductCardProps) => {
  const truncateDescription = (text: string, maxLength = 80) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

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

export default function MainView() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5001/api/products/products-frontend?pageNumber=1&pageSize=10');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      )}
    </main>
  );
}