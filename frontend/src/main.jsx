import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router.jsx";
import "./index.css";

// Global Handler Request
import GlobalRequestHandler from "./components/GlobalRequestHandler.jsx";

// Context
import { AuthProvider } from "./auth/AuthContext.jsx";
import { WishlistProvider } from "./wishlist/WishlistContext.jsx";
import { ProductProvider } from "./products/ProductsContext.jsx";
import { CartProvider } from "./cart/CartContext.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { BlackListProvider } from "./blacklist/BlackListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <ProductProvider>
            <CartProvider>
              <BlackListProvider>
                <GlobalRequestHandler />
                <RouterProvider router={router} />
              </BlackListProvider>
            </CartProvider>
          </ProductProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
