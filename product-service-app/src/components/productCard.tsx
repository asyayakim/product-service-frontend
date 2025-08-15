import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaShoppingBasket } from 'react-icons/fa';
import { useCart } from './CartContext';

interface ProductCardProps {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
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
  description,
  store
}: ProductCardProps) => {
  const {
    favorites,
    basket,
    addToFavorites,
    removeFromFavorites,
    addToBasket,
    removeFromBasket
  } = useCart();

  const isFavorite = favorites.some(item => item.productId === productId);
  const isInBasket = basket.some(item => item.productId === productId);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('no-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const productData = { 
      productId, 
      imageUrl, 
      productName, 
      brand, 
      unitPrice, 
      store 
    };

    if (isFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productData);
    }
  };

  const handleBasketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const productData = { 
      productId, 
      imageUrl, 
      productName, 
      brand, 
      unitPrice, 
      store 
    };

    if (isInBasket) {
      removeFromBasket(productId);
    } else {
      addToBasket(productData);
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
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=No+Image';
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
