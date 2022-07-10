import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // products of different colors are grouped into different entries
    const temp = state.cart.find((item) => item.id === id + color);
    if (temp) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          const newAmount = item.amount + amount;
          return { ...item, amount: Math.min(item.max, newAmount) };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
