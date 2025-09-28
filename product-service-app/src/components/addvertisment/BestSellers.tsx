import { FaHeart, FaExchangeAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../apiConfig';
import ElementStars from '../elements/ElementStars';
import { useAppDispatch, useAppSelector } from "../app/Store";
import { addToFavorites } from "../../features/Favorites/favoritesSlice";
import { addToBasket } from "../../features/Basket/basketSlice";
import Loading from '../elements/Loading';
import { Link, useNavigate } from 'react-router-dom';

interface BestSellersHelper {
  bestSellersProducts: ProductDetails[],
}
export type ProductDetails ={
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

export default function BestSellers({ bestSellersProducts } : BestSellersHelper) {
  const navigate = useNavigate();
  // const [error, setError] = useState<string | null>(null);

  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const basket = useAppSelector((state) => state.basket.items);
  const [animateProductId, setAnimateProductId] = useState<number | null>(null);

  const handleAddToBasket = (product: ProductDetails) => {
    dispatch(addToBasket({ ...product, quantity: 1 }));
    setAnimateProductId(product.productId);

    setTimeout(() => setAnimateProductId(null), 400);
  };

  useEffect(() => {
    if (bestSellersProducts.length > 0) {
      const timer = setTimeout(() => {
        const newVisibleCards = [...visibleCards];
        bestSellersProducts.forEach((_, index) => {
          setTimeout(() => {
            newVisibleCards[index] = true;
            setVisibleCards([...newVisibleCards]);
          }, index * 10);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [bestSellersProducts.length]);

  // if (error) {
  //   return (
  //     <div className="px-4 py-12 mx-auto max-w-7xl">
  //       <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
  //         Error: {error}
  //       </div>
  //     </div>
  //   );
  // }

   const handleClick = (productId: number) => {
    navigate(`/products/${encodeURIComponent(productId)}`);
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl">
      <div className="mb-12 text-center" data-aos="fade-up">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Best Sellers</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Weekly updated selection of our most popular products. Discover the best of the best, handpicked just for you.
        </p>
      </div>

      <section id="best-sellers" className="grid grid-cols-1 gap-8 px-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {bestSellersProducts.map((product, index) => (
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
                <button  onClick={() => handleClick(product.productId)} className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
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
                <div className="relative">
                  <button
                    onClick={() => handleAddToBasket(product)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:text-green-600"
                  >
                    <FaShoppingCart className="text-lg" />
                  </button>

                  {animateProductId === product.productId && (
                    <span
                      className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full -top-3 -right-3 animate-bounce-slow"
                    >
                      +1
                    </span>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}