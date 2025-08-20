import { FaHeart, FaExchangeAlt, FaSearch, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';


// interface ProductDetails {
//   productId: number;
//   imageUrl: string;
//   productName: string;
//   brand: string;
//   unitPrice: number;
//   description: string;
//   ingredients: string;
//   store: {
//     name: string;
//     logo: string;
//   };
//   nutrition: Array<{
//     displayName: string;
//     amount: number;
//     unit: string;
//   }>;
// }
export default function BestSellers() {
  //   const { productId } = useParams<{ productId: string }>();
  // const [product, setProduct] = useState<ProductDetails | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://localhost:5001/api/products/${productId}`);
        
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
        
  //       const data = await response.json();
  //       setProduct(data);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('Failed to fetch product details');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (productId) {
  //     fetchProduct();
  //   }
  // }, [productId]);

  // if (loading) return <div className="loading">Loading product details...</div>;
  // if (error) return <div className="error">Error: {error}</div>;
  // if (!product) return <div className="no-product">Product not found</div>;

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl">
      {/* Section Title */}
      <div className="mb-12 text-center" data-aos="fade-up">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Best Sellers</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Weekly updated selection of our most popular products. Discover the best of the best, handpicked just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
        {/* Product 1 */}
        <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
          <div className="relative">
            <div className="absolute z-10 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-4 left-4">
              Limited
            </div>
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
              alt="Premium Watch" 
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100">
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaHeart className="text-gray-700 hover:text-red-500" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaExchangeAlt className="text-gray-700" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaSearch className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="p-5">
            <div className="mb-1 text-sm font-medium text-blue-600">Premium Collection</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600">
              <a href="#">Mauris blandit aliquet elit</a>
            </h3>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <span className="ml-2 text-sm text-gray-500">(24)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">$189.00</div>
              <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Select Options
              </button>
            </div>
            
            <div className="flex mt-4 space-x-2">
              <span className="w-6 h-6 bg-blue-600 border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-green-600 border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-red-600 border-2 border-white rounded-full shadow cursor-pointer"></span>
            </div>
          </div>
        </div>
        
        {/* Product 2 */}
        <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
              alt="Smart Watch" 
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100">
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaHeart className="text-gray-700 hover:text-red-500" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaExchangeAlt className="text-gray-700" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaSearch className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="p-5">
            <div className="mb-1 text-sm font-medium text-blue-600">Smart Devices</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600">
              <a href="#">Smart Watch Series 5</a>
            </h3>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="ml-2 text-sm text-gray-500">(32)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">$249.00</div>
              <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Select Options
              </button>
            </div>
            
            <div className="flex mt-4 space-x-2">
              <span className="w-6 h-6 bg-black border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-gray-400 border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-pink-400 border-2 border-white rounded-full shadow cursor-pointer"></span>
            </div>
          </div>
        </div>
        
        {/* Product 3 */}
        <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
          <div className="relative">
            <div className="absolute z-10 px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full top-4 left-4">
              New
            </div>
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
              alt="Wireless Headphones" 
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100">
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaHeart className="text-gray-700 hover:text-red-500" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaExchangeAlt className="text-gray-700" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaSearch className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="p-5">
            <div className="mb-1 text-sm font-medium text-blue-600">Audio</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600">
              <a href="#">Wireless Noise Cancelling Headphones</a>
            </h3>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
              </div>
              <span className="ml-2 text-sm text-gray-500">(18)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">$199.00</div>
              <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Select Options
              </button>
            </div>
            
            <div className="flex mt-4 space-x-2">
              <span className="w-6 h-6 bg-black border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-blue-500 border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full shadow cursor-pointer"></span>
            </div>
          </div>
        </div>
        
        {/* Product 4 */}
        <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
              alt="Camera Lens" 
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-20 group-hover:opacity-100">
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaHeart className="text-gray-700 hover:text-red-500" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaExchangeAlt className="text-gray-700" />
              </button>
              <button className="p-3 transition-colors bg-white rounded-full hover:bg-gray-100">
                <FaSearch className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="p-5">
            <div className="mb-1 text-sm font-medium text-blue-600">Photography</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600">
              <a href="#">Professional Camera Lens</a>
            </h3>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
                <FaRegStar />
              </div>
              <span className="ml-2 text-sm text-gray-500">(27)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">$399.00</div>
              <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Select Options
              </button>
            </div>
            
            <div className="flex mt-4 space-x-2">
              <span className="w-6 h-6 bg-black border-2 border-white rounded-full shadow cursor-pointer"></span>
              <span className="w-6 h-6 bg-gray-700 border-2 border-white rounded-full shadow cursor-pointer"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}