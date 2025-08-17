import { Link } from 'react-router-dom';

export default function EmptyBasket() {
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