import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaShoppingBasket } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../components/app/Store";
import { addToFavorites, removeFromFavorites } from "../features/Favorites/favoritesSlice";
import { addToBasket, removeItem } from "../features/Basket/basketSlice";

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

const ProductCard = ({
  productId,
  imageUrl,
  productName,
  brand,
  unitPrice,
  store,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const basket = useAppSelector((state) => state.basket.items);

  const isFavorite = favorites.some((item) => item.productId === productId);
  const isInBasket = basket.some((item) => item.productId === productId);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('no-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    const productData = { 
      productId, 
      imageUrl, 
      productName, 
      brand, 
      unitPrice, 
    quantity: 1, 
    store,
    };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromFavorites(productId));
    } else {
      dispatch(addToFavorites(productData));
    }
  };

  const handleBasketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInBasket) {
      dispatch(removeItem({ ...productData, quantity: 1 })); // remove 1
    } else {
      dispatch(addToBasket(productData));
    }
  };

  return (
    <Link 
      to={`/products/${productId}`} 
      className="product-card-link"
      aria-label={`View details for ${productName}`}
    >
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={imageUrl}
            alt={productName}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://img.icons8.com/?size=100&id=-5tLho_7N4sS&format=png&color=6E6E6E';
            }}
          />
          
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        
        <div className="product-details">
          <div className="brand">{brand}</div>
          <h3 className="product-name">{productName}</h3>
          <div className="price">{formatPrice(unitPrice)} kr</div>
          
          <div className="card-footer">
            <div className="store-info">
              <img
                src={store.logo}
                alt={store.name}
                className="store-logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30?text=Store';
                }}
              />
              <span>{store.name}</span>
            </div>
            
            <button 
              className={`basket-button ${isInBasket ? 'active' : ''}`}
              onClick={handleBasketClick}
              aria-label={isInBasket ? 'Remove from basket' : 'Add to basket'}
            >
              <FaShoppingBasket />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
