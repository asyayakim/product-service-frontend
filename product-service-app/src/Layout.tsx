import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatSearchWidget from './components/ChatSearchWidget'

import './App.css'

function Layout() {
  const location = useLocation();
      const hideNavbarRoutes = ["/login", "/signUp", "/payment", "/login/restorePassword"];
    const hideFooterRoutes = ["/login", "/signUp", "/payment", "/login/restorePassword"];

  return (
    <>
          {!hideNavbarRoutes.includes(location.pathname) && <Header/>}
            <Outlet  />
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
      <ChatSearchWidget />
    </>
  )
}

export default Layout;
