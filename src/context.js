import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import cartItems from "./data";
const url = "https://course-api.com/react-useReducer-cart-project";

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

  // Fetch the data from the API
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <MyContext.Provider
      value={{ ...state, clearItems, remove, increase, decrease, toggleAmount }}
    >
      {children}
    </MyContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(MyContext);
};
