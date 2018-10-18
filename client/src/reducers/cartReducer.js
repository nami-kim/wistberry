import {
  TOGGLE_CART_OPEN,
  ADD_TO_CART,
  FETCH_ITEMS_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  PLUS_QTY_TO_CART,
  MINUS_QTY_TO_CART
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  cartIsOpen: false,
  cart: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART_OPEN:
      return {
        ...state,
        cartIsOpen: !state.cartIsOpen
      };
    case ADD_TO_CART:
      return [...state, action.payload];
    // case FETCH_ITEMS_FROM_CART:
    //   return [
    //     ...state,
    //     action.payload
    //   ];
    case REMOVE_ITEM_FROM_CART:
      return state.filter(({ id }) => id !== action.id);

    case PLUS_QTY_TO_CART:
      // customer ID has to match first?

      return state.map(orderItem => {
        if (orderItem.id === action.id) {
          return {
            ...orderItem,
            ...action.update // ? how to add qty to prev.state
          };
        }
      });

    case MINUS_QTY_TO_CART:
      return state.map(orderItem => {
        if (orderItem.id === action.id) {
          return {
            ...orderItem,
            ...action.update // ? how to add qty to prev.state
          };
        }
      });

    default:
      return state;
  }
};
