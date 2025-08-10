import { useEffect, useState } from 'react';

export default function Basket() {
  const [basketItems, setBasketItems] = useState<any[]>([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    setBasketItems(storedBasket);
  }, []);

  const removeFromBasket = (id: number) => {
    const updatedBasket = basketItems.filter(item => item.productId !== id);
    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  return (
    <div>
      <h1>Your Shopping Basket</h1>
      {basketItems.length === 0 ? (
        <p>Your basket is empty</p>
      ) : (
        <ul>
          {basketItems.map(item => (
            <li key={item.productId}>
              <img src={item.imageUrl} alt={item.productName} width={50} />
              {item.productName} - {item.unitPrice} kr
              <button onClick={() => removeFromBasket(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
