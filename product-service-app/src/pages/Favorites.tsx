import { FaTrash, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';


export default function Favorites() {


  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
    addToBasket,
    basket
  } = useCart();

  const isInBasket = (productId: number) => {
    return basket.some(item => item.productId === productId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Favorite Products</h1>

      </div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Items ({favorites.length})</h2>
        <button
          onClick={clearFavorites}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          Clear Favorites
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-100 rounded-full">
              <FaHeart className="text-4xl text-gray-400" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">No Favorites Yet</h2>
          <p className="max-w-md mx-auto mb-6 text-gray-600">
            You haven't added any products to your favorites. Start exploring our collection!
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {favorites.map(item => (
            <div
              key={item.productId}
              className="flex-grow"
            >
              <div className="justify-between p-4 border-gray-200 border-b-1">
                <div className="relative">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/300?text=No+Image"}
                    alt={item.productName}
                    className="object-contain w-24 h-24"
                  />
                  <button
                    className="absolute p-2 top-4 right-4"
                  >
                    <FaHeart className="text-sm text-red-500" />
                  </button>
                  <span className="absolute right-0 p-2 text-sm text-gray-500 top-8 right-1">Saved</span>
                </div>

                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      {item.brand && <p className="text-sm text-gray-600">{item.brand}</p>}
                      {item.store?.name && (
                        <p className="mt-1 text-xs text-gray-500">
                          Sold by: {item.store.name}
                        </p>
                      )}
                    </div>

                  </div>
                  <div className='relative'>
                    <div className="flex flex-wrap items-center justify-between mt-4">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.unitPrice)}
                      </span>
                      <button
                        onClick={() => removeFromFavorites(item.productId)}
                        className="ml-4 text-gray-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                      {/* <button
                        className={`basket-button ${isInBasket ? 'active' : ''}`}
                        onClick={addToBasket}
                        disabled={isInBasket(item.productId)}
                        title={isInBasket(item.productId) ? 'Already in Basket' : 'Add to Basket'}
                        aria-label={`Add ${item.productName} to basket`}
                      >
                        <FaShoppingBasket />
                      </button> */}
                    </div>
                  </div>


                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 font-medium text-blue-600 transition hover:text-blue-800"
          >
            <span>Continue Shopping</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}