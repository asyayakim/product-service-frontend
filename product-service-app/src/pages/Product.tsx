import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';
import { FaRegHeart, FaHeart, FaShoppingBasket, FaArrowLeft } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../components/app/Store';
import { addToBasket, removeItem } from '../features/Basket/basketSlice';
import { addToFavorites, removeFromFavorites } from '../features/Favorites/favoritesSlice';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const basket = useAppSelector(state => state.basket.items);


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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <span className="ml-4">Loading product details...</span>
    </div>
  );
  
  if (error) return (
    <div className="container p-4 mx-auto">
      <div className="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
        Error: {error}
      </div>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center mt-4 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft className="mr-2" /> Go back
      </button>
    </div>
  );
  
  if (!product) return (
    <div className="container p-4 mx-auto">
      <div className="px-4 py-3 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded">
        Product not found
      </div>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center mt-4 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft className="mr-2" /> Go back
      </button>
    </div>
  );

  const basketItem = basket.find(i => i.productId === product.productId);
  const isInBasket = Boolean(basketItem);
  const isFavorite = favorites.some(f => f.productId === product.productId);

  const productPayloadForBasket = {
    productId: product.productId,
    imageUrl: product.imageUrl,
    productName: product.productName,
    brand: product.brand,
    unitPrice: product.unitPrice,
    quantity: 1,
    store: product.store,
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.productId));
    } else {
      dispatch(addToFavorites({
        productId: product.productId,
        imageUrl: product.imageUrl,
        productName: product.productName,
        brand: product.brand,
        unitPrice: product.unitPrice,
        store: product.store
      }));
    }
  };

  const handleBasketClick = () => {
    if (isInBasket && basketItem) {
      dispatch(removeItem({ ...basketItem, quantity: basketItem.quantity }));
    } else {
      dispatch(addToBasket(productPayloadForBasket));
    }
  };

  return (
    <div className="container max-w-6xl p-4 mx-auto">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <FaArrowLeft className="mr-2" /> Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg ">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-64 h-auto mx-auto rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+Image';
            }}
          />
        </div>
        <div className="p-6 bg-white border-t border-b md:border md:rounded-lg md:border-t-0">
          <h1 className="p-2 mb-6 text-4xl font-bold border-b">{product.productName}</h1>
          <div className="mb-4 text-gray-600">{product.brand}</div>

          <div className="mb-6 text-2xl font-bold text-green-700">{product.unitPrice.toFixed(2)} kr</div>

          <div className="flex items-center mb-6">
            <img
              src={product.store.logo}
              alt={product.store.name}
              className="w-10 h-10 mr-3 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Store';
              }}
            />
            <span className="text-gray-700">Available at {product.store.name}</span>
          </div>

          <div className="flex mb-6 space-x-4">
            <button
              className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                isInBasket 
                  ? ' text-gray-500 hover:text-red-600' 
                  : ' text-gray-500 hover:text-green-600'
              } transition-colors`}
              onClick={handleBasketClick}
            >
              <FaShoppingBasket className="mr-2" />
              {isInBasket ? 'Remove from Basket' : 'Add to Basket'}
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                isFavorite 
                  ? ' text-gray-500 hover:text-pink-500' 
                  : ' text-gray-500 hover:text-gray-500'
              } transition-colors`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <FaHeart className="mr-2 text-red-500" /> : <FaRegHeart className="mr-2" />}
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
            <p className="text-gray-700">{product.ingredients}</p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Nutrition Information</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nutrient</th>
                    <th className="px-4 py-2 text-left">Amount per serving</th>
                  </tr>
                </thead>
                <tbody>
                  {product.nutrition.map((nutrient, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2">{nutrient.displayName === "Unknown" ? "Nutrient" : nutrient.displayName}</td>
                      <td className="px-4 py-2">{nutrient.amount} {nutrient.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}