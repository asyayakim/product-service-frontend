import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaShoppingBasket } from 'react-icons/fa';

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInBasket, setIsInBasket] = useState(false);

  // Check localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');

    setIsFavorite(storedFavorites.some((p: any) => p.productId === productId));
    setIsInBasket(storedBasket.some((p: any) => p.productId === productId));
  }, [productId]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('no-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((p: any) => p.productId !== productId);
    } else {
      updatedFavorites = [...storedFavorites, { productId, imageUrl, productName, brand, unitPrice, store }];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleBasketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');

    let updatedBasket;
    if (isInBasket) {
      updatedBasket = storedBasket.filter((p: any) => p.productId !== productId);
    } else {
      updatedBasket = [...storedBasket, { productId, imageUrl, productName, brand, unitPrice, store }];
    }

    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    setIsInBasket(!isInBasket);
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
          
          {/* Favorite Button */}
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
            
            {/* Basket Button */}
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
