/* eslint-disable array-callback-return */
const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "REMOVE": {
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    }

    case "TOGGLE_AMOUNT": {
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === "inc") {
              return {
                ...cartItem,
                amount: cartItem.amount + 1,
              };
            }
            if (action.payload.type === "dec") {
              return {
                ...cartItem,
                amount: cartItem.amount - 1,
              };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);

      return {
        ...state,
        cart: tempCart,
      };
    }

    case "GET_TOTALS": {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal; // Total price of all the carts
          cartTotal.amount += amount; // Total amount in the cart
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      total = parseFloat(total.toFixed(2));

      return {
        ...state,
        amount,
        total,
      };
    }

    case "LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DISPLAY_ITEMS": {
      return {
        ...state,
        cart: action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
