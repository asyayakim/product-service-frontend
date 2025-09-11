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
import { Provider } from "react-redux";
import { store, persistor } from "./components/app/Store";
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './components/context/CartContext'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <CartProvider>
            <App />
          </CartProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
