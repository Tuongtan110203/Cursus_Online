import React, { createContext, useContext, useState, useEffect } from "react";
import CartAPI from "~/API/CartAPI";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({
    cartItems: [],
    totalItems: 0,
    totalDiscount: 0,
    subTotal: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await CartAPI().getCart();
      setCartData({
        cartItems: response.cartItems,
        totalItems: response.totalItems,
        totalPrice: response.totalPrice,
        totalDiscount: response.totalDiscount,
        subTotal: response.subTotal,
      });
    } catch (error) {
      //    console.error("Failed to fetch cart items", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData, // pass the full cartData object
        setCartData,
        fetchCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
