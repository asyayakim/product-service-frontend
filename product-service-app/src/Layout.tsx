import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatSearchWidget from './components/ChatSearchWidget';
import { useState, useEffect } from 'react';
import './App.css';

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signUp", "/payment", "/login/restorePassword"];
  const hideFooterRoutes = ["/login", "/signUp", "/payment", "/login/restorePassword"];
  

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarRoutes.includes(location.pathname) && <Header/>}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideFooterRoutes.includes(location.pathname) && (
        <div className={`${isMobile ? 'hidden' : 'block'}`}>
          <Footer />
        </div>
      )}
      {!hideFooterRoutes.includes(location.pathname) && !isMobile && <Footer />}
      <ChatSearchWidget />
    </div>
  );
}

export default Layout;