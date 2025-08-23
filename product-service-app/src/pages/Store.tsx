import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  ProductCard from '../components/productCard';
import { API_BASE_URL } from '../apiConfig';
interface Product {
    productId: number;
    imageUrl: string;
    productName: string;
    brand: string;
    unitPrice: number;
    description: string;
    ingredients: string;
    category: string;
    store: {
        storeId: string;
        name: string;
        code: string;
        logo: string;
        url: string;
    };
    nutrition: Array<{
        displayName: string;
        amount: number;
        unit: string;
    }>;
}

export default function Store() {
    const { storeId } = useParams<{ storeId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchStoreProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/stores/products-from-store/${storeId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data);

                if (data && data.length > 0) {
                    setStore(data[0].store);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to fetch store products');
                }
            } finally {
                setLoading(false);
            }
        };

        if (storeId) {
            fetchStoreProducts();
        }
    }, [storeId]);

    if (loading) return <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </div>;
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
    if (!store) return <div className="p-4 text-gray-600">Store not found</div>;

    return (
        <div className="container max-w-6xl p-4 mx-auto">
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center">
                    <img
                        src={store.logo}
                        alt={store.name}
                        className="object-contain w-16 h-16 mr-4"
                    />
                    <div className="flex-grow">
                        <h1 className="text-xl font-bold text-gray-800">{store.name}</h1>
                        <a
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Visit Store Website
                        </a>
                    </div>
                    <div className="text-sm text-gray-500">
                        <span className="font-semibold">{products.length}</span> products available
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Products</h2>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                            <i className="mr-1 fas fa-filter"></i> Filter
                        </button>
                        <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                            <i className="mr-1 fas fa-sort"></i> Sort
                        </button>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {products.map(product => (
                            <ProductCard
                                key={product.productId}
                                {...product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No products found for this store.</p>
                )}

                {products.length > 0 && (
                    <div className="flex justify-center pt-4 mt-6 border-t border-gray-200">
                        <nav className="flex items-center space-x-2">
                            <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="px-2 py-1 text-sm text-white rounded-md bg-slate-700 b">1</button>
                            <button className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">2</button>
                            <button className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">3</button>
                            <span className="px-2 text-gray-500">...</span>
                            <button className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">10</button>
                            <button className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}