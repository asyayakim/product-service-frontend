import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaAward, FaHeadset, FaCartPlus, FaHeart, FaSearch } from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';
import Loading from '../elements/Loading';
import { useAppDispatch, useAppSelector } from "../app/Store";
import { addToFavorites } from "../../features/Favorites/favoritesSlice";

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
interface AddSectionProps {
  featuredProduct: ProductCardProps;
  miniProducts: ProductCardProps[];
}


export default function AddSection({ featuredProduct, miniProducts }: AddSectionProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favorites = useAppSelector((state) => state.favorites.items);

  const handleBrowseStores = () => {
    navigate('/stores');
  };

  const handleShopNow = () => {
    navigate('/all-products');
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };
  const handleClick = (productId: number) => {
    navigate(`/products/${encodeURIComponent(productId)}`);
  };
  const countPrice = (price: number): string => {

    return `kr${(price * 1.2).toFixed(2)}`;
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
            {featuredProduct && (
              <div className="product-card featured" onClick={() => handleProductClick(featuredProduct.productId)} style={{ cursor: 'pointer' }}>
                <img
                  src={featuredProduct.imageUrl || "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636"}
                  alt={featuredProduct.productName}
                  className="img-fluid"
                />
                <div className="product-badge">Best In Test</div>
                <div className="product-info">
                  <h4>{featuredProduct.productName}</h4>
                  <div className="price">
                    <span className="sale-price">kr{featuredProduct.unitPrice}</span>
                    <span className="original-price">{countPrice(featuredProduct.unitPrice)}</span>
                    <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100">
                      <button
                        onClick={() => dispatch(addToFavorites({
                          productId: featuredProduct.productId,
                          imageUrl: featuredProduct.imageUrl,
                          productName: featuredProduct.productName,
                          brand: featuredProduct.brand,
                          unitPrice: featuredProduct.unitPrice,
                          store: featuredProduct.store
                        }))}
                        className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100"
                      >
                        <FaHeart
                          className={`text-gray-700 ${favorites.some(f => f.productId === featuredProduct.productId) ? "text-red-500" : "hover:text-red-500"}`}
                        />
                      </button>
                      <button onClick={() => handleClick(featuredProduct.productId)} className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                        <FaSearch className="text-gray-700" />
                      </button>
                    </div>
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
                  <span className="text-sm text-gray-500 line-through">{countPrice(miniProducts[0].unitPrice)}</span>
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
                  <span className="text-sm text-gray-500 line-through">{countPrice(miniProducts[1].unitPrice)}</span>
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
    </section >
  );
}