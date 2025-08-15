import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../components/CartContext';

// type BasketItem = {
//   productId: number;
//   imageUrl: string;
//   productName: string;
//   brand?: string;
//   unitPrice: number;
//   quantity: number;
//   store?: { name: string; logo?: string };
// };

const TAX_RATE = 0.10; // 10%
const SHIPPING_COSTS = { standard: 4.99, express: 12.99, free: 0 };

export default function Basket() {
  const { 
    basket, 
    setQuantity, 
    removeFromBasket, 
    clearBasket 
  } = useCart();
  
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0); 
  const [shipping, setShipping] = useState<'standard' | 'express' | 'free'>('standard');
  const [couponMessage, setCouponMessage] = useState<string>('');

  const subtotal = useMemo(
    () => basket.reduce((s, item) => s + item.unitPrice * item.quantity, 0),
    [basket]
  );
  
  const discountAmount = subtotal * couponDiscount;
  const tax = (subtotal - discountAmount) * TAX_RATE;
  const shippingCost = (shipping === 'free' && subtotal >= 300) ? 0 : SHIPPING_COSTS[shipping];
  const total = subtotal - discountAmount + tax + shippingCost;

  
  const updateQuantity = (productId: number, qty: number) => {
    if (qty < 1) qty = 1;
    setQuantity(productId, qty);
  };

  const increase = (id: number) => {
    const item = basket.find(item => item.productId === id);
    if (item) {
      setQuantity(id, item.quantity + 1);
    }
  };

  const decrease = (id: number) => {
    const item = basket.find(item => item.productId === id);
    if (item) {
      setQuantity(id, Math.max(1, item.quantity - 1));
    }
  };


  const handleRemoveFromBasket = (id: number) => {
    removeFromBasket(id);
  };

  const handleClearCart = () => {
    clearBasket();
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    let discount = 0;
    let message = '';
    
    if (code === 'SAVE10') {
      discount = 0.10;
      message = '10% discount applied!';
    } else if (code === 'SAVE20') {
      discount = 0.20;
      message = '20% discount applied!';
    } else {
      message = 'Invalid coupon code';
    }
    
    setCouponDiscount(discount);
    setCouponMessage(message);
    setTimeout(() => setCouponMessage(''), 3000);
  };

  if (basket.length === 0) {
    return (
      <div className="max-w-6xl px-4 py-12 mx-auto text-center">
        <div className="p-12 bg-gray-50 rounded-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Your Basket is Empty</h1>
          <p className="mb-8 text-gray-600">
            Looks like you haven't added anything to your basket yet
          </p>
          <Link 
            to="/products" 
            className="inline-block px-8 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Your Shopping Basket</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
   
        <div className="lg:col-span-2">
          <div className="overflow-hidden bg-white shadow-sm rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Items ({basket.length})</h2>
              <button 
                onClick={handleClearCart}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <FaTrash className="mr-1" /> Clear Basket
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {basket.map(item => (
                <div key={item.productId} className="flex flex-col p-4 sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
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
                        onClick={() => handleRemoveFromBasket(item.productId)}
                        className="ml-4 text-gray-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between mt-4">
                      <div className="text-lg font-semibold text-gray-900">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          (${item.unitPrice.toFixed(2)} each)
                        </span>
                      </div>
                      
                      <div className="flex items-center mt-2 border border-gray-300 rounded-md sm:mt-0">
                        <button
                          onClick={() => decrease(item.productId)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                          className="w-12 py-1 text-center border-gray-300 border-x"
                        />
                        
                        <button
                          onClick={() => increase(item.productId)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky p-6 bg-white shadow-sm rounded-xl top-8">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Order Summary</h2>
            
            <div className="mb-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({TAX_RATE * 100}%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between pt-4 text-lg font-bold border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Coupon Section */}
            <div className="mb-6">
              <label htmlFor="coupon" className="block mb-2 text-sm font-medium text-gray-700">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 text-white transition bg-blue-600 rounded-r-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`mt-2 text-sm ${couponMessage.includes('applied') ? 'text-green-600' : 'text-red-600'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium text-gray-700">Shipping Method</h3>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === 'standard'}
                    onChange={() => setShipping('standard')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Standard Shipping</span>
                    <span className="block text-sm text-gray-500">${SHIPPING_COSTS.standard.toFixed(2)} (3-5 business days)</span>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === 'express'}
                    onChange={() => setShipping('express')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Express Shipping</span>
                    <span className="block text-sm text-gray-500">${SHIPPING_COSTS.express.toFixed(2)} (1-2 business days)</span>
                  </div>
                </label>
                
                {subtotal >= 300 && (
                  <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === 'free'}
                      onChange={() => setShipping('free')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">Free Shipping</span>
                      <span className="block text-sm text-gray-500">Orders over $300 (5-7 business days)</span>
                    </div>
                  </label>
                )}
              </div>
            </div>
            
            <button
              className="w-full py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center">
              <Link 
                to="/products" 
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}