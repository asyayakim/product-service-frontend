import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from './Login';

interface ProductDetails {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
  unitPrice: number;
  description: string;
  ingredients: string;
  store: {
    name: string;
    logo: string;
  };
  nutrition: Array<{
    displayName: string;
    amount: number;
    unit: string;
  }>;
}

export default function Product() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch product details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="no-product">Product not found</div>;

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">&larr; Back to products</Link>
      
      <div className="product-detail-container">
        <div className="product-image-section">
          <img 
            src={product.imageUrl} 
            alt={product.productName} 
            className="detail-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+Image';
            }}
          />
        </div>
        
        <div className="product-info-section">
          <h1>{product.productName}</h1>
          <div className="brand">{product.brand}</div>
          
          <div className="price">{product.unitPrice.toFixed(2)} kr</div>
          
          <div className="store-info-main">
            <img 
              src={product.store.logo} 
              alt={product.store.name} 
              className="store-logo-main"
            />
            <span>Available at {product.store.name}</span>
          </div>
          
          <div className="description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          
          <div className="ingredients">
            <h2>Ingredients</h2>
            <p>{product.ingredients}</p>
          </div>
          
          <div className="nutrition">
            <h2>Nutrition Information</h2>
            <table>
              <tbody>
                {product.nutrition.map((nutrient, index) => (
                  <tr key={index}>
                    <td>{nutrient.displayName === "Unknown" ? "Nutrient" : nutrient.displayName}</td>
                    <td>{nutrient.amount} {nutrient.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="add-to-basket">Add to Basket</button>
        </div>
      </div>
    </div>
  );
}