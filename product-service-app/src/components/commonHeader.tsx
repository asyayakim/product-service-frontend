import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingBasket, FaSearch, FaUser, FaTimes } from 'react-icons/fa';
import AdvertismentTop from './AdvertismentTop';


type CommonHeaderProps = {
  user: any;
  logout: () => void;
};
interface Store {
  storeId: number;
  name: string;
  description: string;
}

const CommonHeader = ({ user, logout }: CommonHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [basketItems, setBasketItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
      
    };
    

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchBasketItems = async () => {
      const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
      setBasketItems(storedBasket);
    };

    fetchBasketItems();
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      if (!isSearchOpen) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/stores/store-names`);

        if (!response.ok) {
          throw new Error(`Failed to fetch stores: ${response.status}`);
        }

        const data = await response.json();
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [isSearchOpen]);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSearchOpen]);


  const handleStoreClick = (storeId: number) => {
    setIsSearchOpen(false);
    console.log(`Navigating to store with ID: ${storeId}`);
  };

  return (
    <header id="header" className="header sticky-top">
      <AdvertismentTop />

      {/* Search Sidebar Overlay */}
      {isSearchOpen && (
        <div
          className="search-overlay"
          onClick={() => setIsSearchOpen(false)}
        />
      )}

      {/* Search Sidebar */}
      <div className={`search-sidebar ${isSearchOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h3>Search Products</h3>
          <button
            className="close-btn"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <FaTimes />
          </button>
        </div>
        <div className="search-content">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="search-input"
            />
            <button className="search-button">

              <FaSearch />
            </button>
          </div>
          {/* <div className="recent-searches">
            <h4>Recent Searches</h4>
            <ul>
              <li>Organic Vegetables</li>
              <li>Whole Grain Bread</li>
              <li>Fair Trade Coffee</li>
            </ul>
          </div> */}
          <div className="popular-categories">
            <h4>Stores</h4>
            <div className="category-grid">
              {stores.length > 0 ? (
                stores.map(store => (
                  <div
                    key={store.storeId}
                    className="category-card"
                    onClick={() => handleStoreClick(store.storeId)}
                  >
                    <h5>{store.name}</h5>

                  </div>
                ))
              ) : (
                <div className="no-products">No stores found</div>
              )}
            </div>
            <h4>Popular Categories</h4>

            <div className="category-card">
              <div className="category-card">Fruits & Vegetables</div>
              <div className="category-card">Bakery</div>
              <div className="category-card">Dairy & Eggs</div>
              <div className="category-card">Beverages</div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-container">
        <Link to="/" className="logo" aria-label="Home">
          <div className="logo-wrapper">
            <img
              src="https://img.icons8.com/?size=100&id=ecFqihp4hbvR&format=png&color=27ae60"
              alt="Marketplace logo"
              className="logo-image"
            />
            <h1 className="site-name">Product Donor</h1>
          </div>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li className="nav-item search-icon">
              <button
                className="nav-button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
              >
                <FaSearch />
                <span className="nav-text">Search</span>
              </button>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FaHome />
                <span className="nav-text">Home</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/favorite" className="nav-link">
                <div className="basket-icon-container">
                  <FaHeart />
                  <span className="basket-badge">{favorites.length}</span>
                </div>
                <span className="nav-text">Favorites</span>
              </Link>
            </li>

            <li className="nav-item basket-item">
              <Link to="/basket" className="nav-link">
                <div className="basket-icon-container">
                  <FaShoppingBasket />
                  <span className="basket-badge">{basketItems.length}</span>
                </div>
                <span className="nav-text">Basket</span>
              </Link>
            </li>

            <li className="nav-item">
              {user ? (
                <button
                  onClick={logout}
                  className="nav-link"
                  aria-label="Logout"
                >
                  <FaUser />
                  <span className="nav-text">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="nav-link"
                  aria-label="Login"
                >
                  <FaUser />
                  <span className="nav-text">Login</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CommonHeader;