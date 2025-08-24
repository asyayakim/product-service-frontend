import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingBasket, FaSearch, FaUser, FaTimes, FaStore, FaTags } from 'react-icons/fa';
import AdvertismentTop from '../addvertisment/AdvertismentTop';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../../apiConfig';

type CommonHeaderProps = {
  user: any;
  logout: () => void;
};

interface Store {
  storeId: number;
  name: string;
  description: string;
}

export default function CommonHeader({ user, logout }: CommonHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites, basket } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!isSearchOpen) return;

      try {
        setLoading(true);
        setError(null);

        const [storesResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/stores/store-names`),
          fetch(`${API_BASE_URL}/api/products/categories`)
        ]);

        if (!storesResponse.ok) {
          throw new Error(`Failed to fetch stores: ${storesResponse.status}`);
        }

        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
        }

        const storesData = await storesResponse.json();
        const categoriesData = await categoriesResponse.json();

        setStores(storesData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSearchOpen]);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSearchOpen]);

  const handleStoreClick = (storeId: number) => {
    setIsSearchOpen(false);
    navigate(`/store/${storeId}`);
  };

  const handleCategoryClick = (category: string) => {
    setIsSearchOpen(false);
    navigate(`/all-products/${category}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header id="header" className="header sticky-top">
      <AdvertismentTop />

      {/* Search Sidebar Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsSearchOpen(false)}
        />
      )}

      {/* Search Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isSearchOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">Search Products</h3>
          <button
            className="p-2 text-gray-500 transition-colors hover:text-red-500"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <div className="h-full p-5 overflow-y-auto">
          <form onSubmit={handleSearch} className="flex mb-6">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-r-md hover:bg-gray-800"
            >
              <FaSearch />
            </button>
          </form>

          {error && (
            <div className="p-3 mb-4 text-red-700 rounded-md bg-red-50">
              {error}
            </div>
          )}
          
          {/* Stores Section */}
          <div>
            <div className="flex items-center mb-4">
              <FaStore className="mr-2 text-gray-600" />
              <h4 className="text-lg font-medium text-gray-800 border-b-2">Stores</h4>
            </div>

            {loading ? (
              <div className="py-4 text-center text-gray-500">Loading stores...</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {stores.length > 0 ? (
                  stores.map(store => (
                    <div
                      key={store.storeId}
                      className="transition-all cursor-pointer px-3 py-1.5 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-700"
                      onClick={() => handleStoreClick(store.storeId)}
                    >
                     <h5 className="text-sm font-medium text-gray-800 hover:text-blue-700">{store.name}</h5>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-gray-500">No stores found</div>
                )}
              </div>
            )}
          </div>

          {/* Categories Section */}
          <div>
            <div className="flex items-center pt-2 mb-4">
              <FaTags className="mr-2 text-gray-600" />
              <h4 className="text-lg font-medium text-gray-800 border-b-2">Categories</h4>
            </div>

            {loading ? (
              <div className="py-4 text-center text-gray-500">Loading categories...</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.length > 0 ? (
                  categories.map(category => (
                    <div
                      key={category}
                      className="transition-all cursor-pointer px-3 py-1.5 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-700"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <h5 className="text-sm font-medium text-gray-800 hover:text-blue-700">{category}</h5>
                    </div>
                  ))
                ) : (
                  <div className="w-full py-4 text-center text-gray-500">No categories found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="header-container">
        <Link to="/" className="logo" aria-label="Home">
          <div className="logo-wrapper">
            <img
              src="https://img.icons8.com/?size=100&id=101413&format=png&color=000000"
              alt="Marketplace logo"
              className="logo-image"
            />
            <h1 className="text-xl font-weight-700 site-name">Product Donor</h1>
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
                  <span className="basket-badge">{basket.length}</span>
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