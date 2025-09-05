import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/loginregister.css";
import "./css/search.css";
import "./css/chatSearchWidget.css";
import "./css/main-view.css";
import App from "./App";
import "./css/product-card.css";
import "./css/product-details.css";
import "./css/css/main.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import { Provider } from "react-redux";
import { store, persistor } from "./components/app/Store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
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
  </StrictMode>
);
