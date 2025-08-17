import { Link } from 'react-router-dom';

type OrderSummaryProps = {
  subtotal: number;
  discountAmount: number;
  tax: number;
  shippingCost: number;
  total: number;
  coupon: string;
  setCoupon: (value: string) => void;
  couponMessage: string;
  shipping: 'standard' | 'express' | 'free';
  setShipping: (value: 'standard' | 'express' | 'free') => void;
  applyCoupon: () => void;
};

const SHIPPING_COSTS = { standard: 4.99, express: 12.99, free: 0 };
const TAX_RATE = 0.10;

export default function OrderSummary({
  subtotal,
  discountAmount,
  tax,
  shippingCost,
  total,
  coupon,
  setCoupon,
  couponMessage,
  shipping,
  setShipping,
  applyCoupon
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="sticky p-6 bg-white shadow-sm top-8 rounded-xl">
      <h2 className="mb-6 text-xl font-bold text-gray-800">Order Summary</h2>
      
      <div className="mb-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">-{formatPrice(discountAmount)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax ({TAX_RATE * 100}%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
          </span>
        </div>
        
        <div className="flex justify-between pt-4 text-lg font-bold border-t border-gray-200">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

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
              <span className="block text-sm text-gray-500">{formatPrice(SHIPPING_COSTS.standard)} (3-5 business days)</span>
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
              <span className="block text-sm text-gray-500">{formatPrice(SHIPPING_COSTS.express)} (1-2 business days)</span>
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
                <span className="block text-sm text-gray-500">Orders over {formatPrice(300)} (5-7 business days)</span>
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
  );
}