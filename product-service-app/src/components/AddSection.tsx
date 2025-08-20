//import { useCart } from '../components/context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  FaTruck,
  FaAward,
  FaHeadset,
  FaCartPlus,
  FaHeart,
  FaSearch
} from 'react-icons/fa';

export default function AddSection() {
  const navigate = useNavigate();

  const handleBrowseStores = () => {
    navigate('/stores'); 
  };

  const handleShopNow = () => {
    navigate('/products'); 
  };

  

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
            <div className="product-card featured">
              <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636" alt="Featured Product" className="img-fluid" />
              <div className="product-badge">Best Seller</div>
              <div className="product-info">
                <h4>Premium Wireless Headphones</h4>
                <div className="price">
                  <span className="sale-price">$299</span>
                  <span className="original-price">$399</span>
                </div>
              </div>
            </div>

            <div className="product-grid">
              <div className="product-mini" data-aos="zoom-in" data-aos-delay="400">
                <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636" alt="Product" className="img-fluid" />
                <span className="mini-price">$89</span>
              </div>
              <div className="product-mini" data-aos="zoom-in" data-aos-delay="500">
                <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636" alt="Product" className="img-fluid" />
                <span className="mini-price">$149</span>
              </div>
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