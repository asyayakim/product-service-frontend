import { FaHeart, FaExchangeAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../apiConfig';
import ElementStars from '../elements/ElementStars';
import { useAppDispatch, useAppSelector } from "../app/Store";
import { addToFavorites, removeFromFavorites } from "../../features/Favorites/favoritesSlice";
import { addToBasket, removeItem } from "../../features/Basket/basketSlice";


interface ProductDetails {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
  category: string;
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

export default function BestSellers() {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const basket = useAppSelector((state) => state.basket.items);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/top-sellers`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setVisibleCards(new Array(data.length).fill(false));
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

    fetchProducts();
  }, []);


  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        const newVisibleCards = [...visibleCards];
        products.forEach((_, index) => {
          setTimeout(() => {
            newVisibleCards[index] = true;
            setVisibleCards([...newVisibleCards]);
          }, index * 10);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [products.length]);

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
    <div className="px-4 py-12 mx-auto max-w-7xl">
      <div className="mb-12 text-center" data-aos="fade-up">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Best Sellers</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Weekly updated selection of our most popular products. Discover the best of the best, handpicked just for you.
        </p>
      </div>

      <section id="best-sellers" className="grid grid-cols-1 gap-8 px-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={product.productId}
            className={`
              overflow-hidden transition-all bg-white rounded-xl hover:shadow-xl
              transform duration-500 ease-out
              ${visibleCards[index]
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
              }
            `}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative flex items-center justify-center h-48 group">
              <div className="absolute z-10 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-4 left-4">
                Popular
              </div>
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="object-contain transition-all duration-300 max-h-40 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100">
                <button
                  onClick={() => dispatch(addToFavorites({
                    productId: product.productId,
                    imageUrl: product.imageUrl,
                    productName: product.productName,
                    brand: product.brand,
                    unitPrice: product.unitPrice,
                    store: product.store
                  }))}
                  className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100"
                >
                  <FaHeart
                    className={`text-gray-700 ${favorites.some(f => f.productId === product.productId) ? "text-red-500" : "hover:text-red-500"}`}
                  />
                </button>

                <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                  <FaExchangeAlt className="text-gray-700" />
                </button>
                <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                  <FaSearch className="text-gray-700" />
                </button>
              </div>
            </div>

            <div className="p-5 product-category">
              <div className="mb-1 text-sm font-medium text-gray-600">{product.brand}</div>
              <h3 className="mb-2 text-lg font-medium text-gray-800 transition-colors line-clamp-2">
                {product.productName}
              </h3>

              <div className="flex items-center mb-3">
                <ElementStars rating={4.5} />
                <span className="ml-2 text-sm text-gray-500">(24)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900">${product.unitPrice.toFixed(2)}</div>
                <button
                  onClick={() => dispatch(addToBasket({ ...product, quantity: 1  }))}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:text-green-600"
                >
                  <FaShoppingCart className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}