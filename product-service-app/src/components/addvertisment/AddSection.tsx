import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTruck,
  FaAward,
  FaHeadset,
  FaCartPlus,
  FaHeart,
  FaSearch
} from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';
import Loading from '../elements/Loading';

interface ProductCardProps {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
  category?: string;
  unitPrice: number;
  description: string;
  store: {
    name: string;
    logo: string;
  };
}

export default function AddSection() {
  const navigate = useNavigate();
  const [featuredProduct, setFeaturedProduct] = useState<ProductCardProps | null>(null);
  const [miniProducts, setMiniProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        setLoading(true);
        const featuredResponse = await fetch(`${API_BASE_URL}/api/products/product-of-the-week`);
        if (!featuredResponse.ok) {
          throw new Error('Failed to fetch featured product');
        }
        const featuredData = await featuredResponse.json();

        const miniResponse = await fetch(`${API_BASE_URL}/api/products/recent?limit=2`);
        if (!miniResponse.ok) {
          throw new Error('Failed to fetch mini products');
        }
        const miniData = await miniResponse.json();

        setFeaturedProduct(featuredData);
        setMiniProducts(miniData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching hero products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroProducts();
  }, []);

  const handleBrowseStores = () => {
    navigate('/stores');
  };

  const handleShopNow = () => {
    navigate('/all-products');
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
      return <Loading />;
  }

  if (error) {
    return (
      <section id="hero" className="hero section">
        <div className="hero-container">
          <div className="error-placeholder">
            <p>Error loading products: {error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="hero section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="content-wrapper" data-aos="fade-up" data-aos-delay="100">
            <h1 className="hero-title">Buy Food for Those in Need</h1>
            <p className="hero-description">Join us in our mission to provide food for those who need it most. Your support can make a difference!</p>
            <div className="hero-actions" data-aos="fade-up" data-aos-delay="200">
              <button onClick={handleShopNow} className="btn-primary">Shop Now</button>
              <button onClick={handleBrowseStores} className="btn-secondary">Browse Stores</button>
            </div>
            <div className="features-list" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-item">
                <FaTruck className="icon" />
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <FaAward className="icon" />
                <span>Quality Products</span>
              </div>
              <div className="feature-item">
                <FaHeadset className="icon" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visuals">
          <div className="product-showcase" data-aos="fade-left" data-aos-delay="200">
            {featuredProduct && (
              <div className="product-card featured" onClick={() => handleProductClick(featuredProduct.productId)} style={{ cursor: 'pointer' }}>
                <img
                  src={featuredProduct.imageUrl || "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636"}
                  alt={featuredProduct.productName}
                  className="img-fluid"
                />
                <div className="product-badge">Best Seller</div>
                <div className="product-info">
                  <h4>{featuredProduct.productName}</h4>
                  <div className="price">
                    <span className="sale-price">kr{featuredProduct.unitPrice}</span>
                    {/* <span className="original-price">$399</span> */}
                  </div>
                </div>
              </div>
            )}

            <div className="product-grid">
              {miniProducts.length > 0 && (
                <div className="product-mini" data-aos="zoom-in" data-aos-delay="400"
                  onClick={() => handleProductClick(miniProducts[0].productId)}
                  style={{ cursor: 'pointer' }}>
                  <img
                    src={miniProducts[0].imageUrl || "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636"}
                    alt={miniProducts[0].productName}
                    className="img-fluid"
                  />
                  <span className="mini-price">kr{miniProducts[0].unitPrice}</span>
                </div>
              )}

              {miniProducts.length > 1 && (
                <div className="product-mini" data-aos="zoom-in"
                  data-aos-delay="500"
                  onClick={() => handleProductClick(miniProducts[1].productId)} style={{ cursor: 'pointer' }}>
                  <img
                    src={miniProducts[1].imageUrl || "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636"}
                    alt={miniProducts[1].productName}
                    className="img-fluid"
                  />
                  <span className="mini-price">kr{miniProducts[1].unitPrice}</span>
                </div>
              )}
            </div>
          </div>

          <div className="floating-elements">
            <div className="floating-icon cart" data-aos="fade-up" data-aos-delay="600">
              <FaCartPlus className="icon" />
              <span className="notification-dot">3</span>
            </div>
            <div className="floating-icon wishlist" data-aos="fade-up" data-aos-delay="700">
              <FaHeart className="icon" />
            </div>
            <div className="floating-icon search" data-aos="fade-up" data-aos-delay="800">
              <FaSearch className="icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}