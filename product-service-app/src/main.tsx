import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './loginregister.css'
import './search.css'
import './chatSearchWidget.css'
import './main-view.css'
import App from './App'
import './product-card.css'
import './product-details.css'
import './css/css/main.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from  './components/context/CartContext'
import { Provider } from 'react-redux'
import {store } from '../src/components/app/Store'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider>
          <App />
        </CartProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
