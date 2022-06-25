import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import cartItems from "./data";

const MyContext = React.createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Clear all the items
  const clearItems = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Clear one item
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  // Increase cart
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  // Decrease cart
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <MyContext.Provider
      value={{ ...state, clearItems, remove, increase, decrease }}
    >
      {children}
    </MyContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(MyContext);
};
