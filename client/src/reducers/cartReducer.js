import {
  TOGGLE_CART_OPEN,
  ADD_TO_CART,
  SET_CART,
  RESET_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART
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
      return { ...state, cart: [...state.cart, ...action.cartItems] };

    case SET_CART:
      return { ...state, cart: action.cart };

    case RESET_CART:
      return initialState;

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(({ group }) => group.id !== action.groupId)
      };
    case UPDATE_CART:
    return {
      ...state,
      cart: action.newCart
    }

    default:
      return state;
  }
};
