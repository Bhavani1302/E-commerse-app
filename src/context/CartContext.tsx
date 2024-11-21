import React, { createContext, useState, ReactNode, useContext } from "react";


type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};


type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
