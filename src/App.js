import React from "react";
import { useGlobalContext } from "./context";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

function App() {
  const { isLoading, cart, setIsLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <CartContainer />
    </>
  );
}

export default App;
