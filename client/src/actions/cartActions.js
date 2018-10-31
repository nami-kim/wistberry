import axios from 'axios';
import {
  TOGGLE_CART_OPEN,
  ADD_TO_CART,
  SET_CART,
  RESET_CART,
  FETCH_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART
} from './types';

// addToCart: dispatch to cart : cartObject (sku#, quantity)
export const toggleCartOpen = () => ({
  type: TOGGLE_CART_OPEN
});

export const addToCart = cartItems => ({
  type: ADD_TO_CART,
  cartItems
});

export const startAddToCart = cartItems => (dispatch, getState) => {
  const { isAuthenticated, authUser } = getState().auth;
  const prevCart = getState().cart.cart;
  const newCart = prevCart.concat(cartItems);

  if (isAuthenticated) {
    axios.post('/api/users/me/cart', { email: authUser.email, cart: newCart });
  } else {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  dispatch(addToCart(cartItems));
};

export const setCart = cart => ({
  type: SET_CART,
  cart
});

export const resetCart = () => ({
  type: RESET_CART
});
export const fetchCart = () => getState => getState().cart.cart;

export const removeItemFromCart = groupId => ({
  type: REMOVE_ITEM_FROM_CART,
  groupId
});

export const startRemoveItemFromCart = groupId => (dispatch, getState) => {
  const { isAuthenticated, authUser } = getState().auth;
  const prevCart = getState().cart.cart;
  const newCart = prevCart.filter(({ group }) => group.id !== groupId);

  if (isAuthenticated) {
    axios.post('/api/users/me/cart', { email: authUser.email, cart: newCart });
  } else {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  dispatch(removeItemFromCart(groupId));
};

// export const incrementQty = groupId => ({
//   type: INCREMENT_QTY,
//   groupId
// });

export const updateCart = newCart => ({
  type: UPDATE_CART,
  newCart
})

export const startIncrementQty = groupId => (dispatch, getState) => {
  const { isAuthenticated, authUser } = getState().auth;
  const prevCart = getState().cart.cart;
  const newCart = prevCart.map(({ group, items }) => {
    if (group.id === groupId) {
      return {
        group: {
          ...group,
          quantity: group.quantity + 1
        },
        items
      };
    }
    return { group, items };
  });

  if (isAuthenticated) {
    axios.post('/api/users/me/cart', { email: authUser.email, cart: newCart });
  } else {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  dispatch(updateCart(newCart));
};

// export const decrementQty = groupId => ({
//   type: DECREMENT_QTY,
//   groupId
// });

export const startDecrementQty = groupId => (dispatch, getState) => {
  const { isAuthenticated, authUser } = getState().auth;
  const prevCart = getState().cart.cart;
  const newCart = prevCart.map(({ group, items }) => {
    if (group.id === groupId && group.quantity > 1) {
      return {
        group: {
          ...group,
          quantity: group.quantity - 1
        },
        items
      };
    }
    return { group, items };
  });

  if (isAuthenticated) {
    axios.post('/api/users/me/cart', { email: authUser.email, cart: newCart });
  } else {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  dispatch(updateCart(newCart));
};
