import AddSection from '../components/addvertisment/AddSection';
import BestSellers from '../components/addvertisment/BestSellers';
import PromoCards from '../components/addvertisment/PromoCards';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../apiConfig";
import Loading from '../components/elements/Loading';


export default function MainView() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [featuredProduct, miniProducts, bestSellersProducts, topCategories] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products/product-of-the-week`).then(r => r.json()),
          fetch(`${API_BASE_URL}/api/products/recent?limit=2`).then(r => r.json()),
          fetch(`${API_BASE_URL}/api/products/top-sellers`).then(r => r.json()),
          fetch(`${API_BASE_URL}/api/products/categories-with-total-products`).then(r => r.json()),
        ]
        );
        setData({
          featuredProduct, miniProducts, bestSellersProducts, topCategories
        })
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);
  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }
  
  return (
    <main className="main-view">
      <AddSection featuredProduct={data.featuredProduct } miniProducts={data.miniProducts} />
      <BestSellers bestSellersProducts={ data.bestSellersProducts} />
      <PromoCards topCategories={data.topCategories} />
    </main>
  );
}