import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './loginregister.css'
import './search.css'
import './chatSearchWidget.css'
import './main-view.css'
import App from './App.tsx'
import './product-card.css'
import './product-details.css'
import './css/css/main.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from  './components/context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
