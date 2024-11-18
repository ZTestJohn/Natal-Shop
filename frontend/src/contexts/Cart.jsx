/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();
CartContext.displayName = "MyCart";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const { cart, setCart } = useContext(CartContext);

  function addToCart(newItem) {
    setCart((prevCart) => {
      const itemExists = prevCart.some(
        (item) => item.codigo_unico === newItem.codigo_unico
      );

      if (itemExists) {
        return prevCart.filter((i) => i.codigo_unico !== newItem.codigo_unico);
      }
      return [...prevCart, newItem];
    });
  }

  return {
    cart,
    addToCart,
  };
}
