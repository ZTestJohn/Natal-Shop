import { FilteredProductsProvider } from "./contexts/FilteredProducts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import FavoritesProvider from "./contexts/Favorite";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import CartProvider from "./contexts/Cart";

function AppRoutes() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <FilteredProductsProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Shop" element={<Shop />}></Route>
              <Route path="/Favorites" element={<Favorites />}></Route>
              <Route path="/Cart" element={<Cart />}></Route>
              <Route path="/CreateAccount" element={<CreateAccount />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Product/:id" element={<Product />}></Route>
              <Route path="/SearchPage/:text" element={<SearchPage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </FilteredProductsProvider>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
