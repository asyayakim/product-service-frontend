import { useEffect, useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(item => item.productId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite products yet</p>
      ) : (
        <ul>
          {favorites.map(item => (
            <li key={item.productId}>
              <img src={item.imageUrl} alt={item.productName} width={50} />
              {item.productName} - {item.unitPrice} kr
              <button onClick={() => removeFromFavorites(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
