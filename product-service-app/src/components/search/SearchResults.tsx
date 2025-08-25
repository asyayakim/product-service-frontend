
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../productCard';
import { API_BASE_URL } from '../../apiConfig';

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

export default function SearchResults() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `${API_BASE_URL}/api/products/search?q=${encodeURIComponent(searchQuery)}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while searching');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        Search Results for "{searchQuery}"
      </h1>
      
      {products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">No products found for your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      )}
    </div>
  );
}