import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { BasketItem as BasketItemType } from "../../features/Basket/basketSlice";


export interface BasketItemProps {
  item: BasketItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onUpdate: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
}

export default function BasketItem({ 
  item, 
  onIncrease, 
  onDecrease, 
  onUpdate, 
  onRemove 
}: BasketItemProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="flex flex-col p-4 sm:flex-row">
      <div className="flex-shrink-0 mb-4 mr-6 sm:mb-0">
        <img 
          src={item.imageUrl || "https://via.placeholder.com/100"} 
          alt={item.productName} 
          className="object-contain w-24 h-24"
        />
      </div>
      
      <div className="flex-grow">
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
          <button 
            onClick={() => onRemove(item.productId)}
            className="ml-4 text-gray-400 hover:text-red-500"
          >
            <FaTrash />
          </button>
        </div>
        
        <div className="flex flex-wrap items-center justify-between mt-4">
          <div className="text-lg font-semibold text-gray-900">
            {formatPrice(item.unitPrice * item.quantity)}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({formatPrice(item.unitPrice)} each)
            </span>
          </div>
          
          <div className="flex items-center mt-2 border border-gray-300 rounded-md sm:mt-0">
            <button
              onClick={() => onDecrease(item.productId)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <FaMinus />
            </button>
            
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdate(item.productId, parseInt(e.target.value) || 1)}
              className="w-12 py-1 text-center border-gray-300 border-x"
            />
            
            <button
              onClick={() => onIncrease(item.productId)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}