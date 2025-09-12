import { useMemo, useState } from "react";
import EmptyBasket from "../components/basket/EmptyBasket";
import BasketItem from "../components/basket/BasketItem";
import OrderSummary from "../components/basket/OrderSummary";
import { clearBasket, addToBasket, removeItem } from "../features/Basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../components/app/Store";

const TAX_RATE = 0.10; // 10%
const SHIPPING_COSTS = { standard: 4.99, express: 12.99, free: 0 };

export default function Basket() {
  const basket = useAppSelector((state) => state.basket.items);
  const dispatch = useAppDispatch();
  
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0); 
  const [shipping, setShipping] = useState<"standard" | "express" | "free">("standard");
  const [couponMessage, setCouponMessage] = useState<string>("");

  const subtotal = useMemo(
    () => basket.reduce((s, item) => s + item.unitPrice * item.quantity, 0),
    [basket]
  );
  
  const discountAmount = subtotal * couponDiscount;
  const tax = (subtotal - discountAmount) * TAX_RATE;
  const shippingCost = shipping === "free" && subtotal >= 300 ? 0 : SHIPPING_COSTS[shipping];
  const total = subtotal - discountAmount + tax + shippingCost;

  const handleIncrease = (productId: number) => {
    const item = basket.find((i) => i.productId === productId);
    if (item) {
      dispatch(addToBasket({ ...item, quantity: 1 }));
    }
  };

  const handleDecrease = (productId: number) => {
    const item = basket.find((i) => i.productId === productId);
    if (item) {
      dispatch(removeItem({ ...item, quantity: 1 }));
    }
  };

  const handleUpdate = (productId: number, qty: number) => {
    const item = basket.find((i) => i.productId === productId);
    if (item) {
      const diff = qty - item.quantity;
      if (diff > 0) {
        dispatch(addToBasket({ ...item, quantity: diff }));
      } else if (diff < 0) {
        dispatch(removeItem({ ...item, quantity: -diff }));
      }
    }
  };

  const handleRemove = (productId: number) => {
    const item = basket.find((i) => i.productId === productId);
    if (item) {
      dispatch(removeItem({ ...item, quantity: item.quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearBasket());
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
    return <EmptyBasket />;
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
                Clear Basket
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {basket.map((item) => (
                <BasketItem 
                  key={item.productId}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        </div>
        <OrderSummary
          subtotal={subtotal}
          discountAmount={discountAmount}
          tax={tax}
          shippingCost={shippingCost}
          total={total}
          coupon={coupon}
          setCoupon={setCoupon}
          couponMessage={couponMessage}
          shipping={shipping}
          setShipping={setShipping}
          applyCoupon={applyCoupon}
        />
      </div>
    </div>
  );
}
