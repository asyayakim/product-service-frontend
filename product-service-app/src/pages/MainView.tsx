import AddSection from '../components/addvertisment/AddSection';
import BestSellers from '../components/addvertisment/BestSellers';
import PromoCards from '../components/addvertisment/PromoCards';


export default function MainView() {
  return (
    <main className="main-view">
      <AddSection />
      <BestSellers />
      <PromoCards />
    </main>
  );
}