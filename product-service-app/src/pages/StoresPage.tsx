import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CVAdvertisement from '../components/addvertisment/CVAdvertisement';
import { API_BASE_URL } from './Login';

interface Store {
    storeId: number;
    name: string;
    description: string;
    logo?: string;
    url?: string;
}

export default function StoresPage() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/stores/store-names`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch stores: ${response.status}`);
                }

                const data = await response.json();
                setStores(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch stores');
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    const handleStoreClick = (storeId: number) => {
        navigate(`/store/${storeId}`);
    };

    if (loading) return <div className="p-4 text-gray-600">Loading stores...</div>;
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

    return (
    <div className="container max-w-6xl p-4 mx-auto">
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <CVAdvertisement/>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">All Stores</h1>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">{stores.length}</span> stores available
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Browse Stores</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Filter
            </button>
            <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Sort
            </button>
          </div>
        </div>

        {stores.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {stores.map(store => (
              <div
                key={store.storeId}
                className="p-4 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer"
                onClick={() => handleStoreClick(store.storeId)}
              >
                <div className="flex justify-center mb-3">
                  {store.logo ? (
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="object-contain h-16"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                      <span className="text-xl font-semibold text-gray-600">
                        {store.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="mb-1 text-sm font-medium text-center text-gray-900 line-clamp-2">
                  {store.name}
                </h3>
                {store.description && (
                  <p className="text-xs text-center text-gray-500 line-clamp-2">
                    {store.description}
                  </p>
                )}
                <button
                  className="w-full py-1.5 mt-3 text-xs text-black border rounded-md hover:border-black transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStoreClick(store.storeId);
                  }}
                >
                  View Store
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No stores found.</p>
        )}
      </div>
    </div>
    );
}