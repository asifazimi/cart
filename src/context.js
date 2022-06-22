import React, { useState, useContext } from "react";
import cartItems from "./data";

const MyContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItems);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MyContext.Provider value={{ cart, setCart, isLoading, setIsLoading }}>
      {children}
    </MyContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(MyContext);
};
