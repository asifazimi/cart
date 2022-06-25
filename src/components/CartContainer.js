/* eslint-disable array-callback-return */
import React from "react";
import { useGlobalContext } from "../context";
// component
import CartItem from "./CartItem";

const CartContainer = () => {
  const { cart, total, clearItems } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  //   remove cartItems
  // const removeCartItems = () => {
  //   setCart([]);
  // };

  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem {...item} key={item.id}></CartItem>;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={clearItems}>
          clear item
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
