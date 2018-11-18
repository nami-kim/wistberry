import axios from 'axios';
import { SET_USER, RESET_USER } from './types';
import { setCart } from './cartActions';
import { startSetCheckout } from './checkoutActions';
import _ from 'lodash';

export const startSetUser = email => (dispatch, getState) => {
  const { cart } = getState().cart;
  axios
    .get(`/api/users/me?email=${encodeURIComponent(email)}`)
    .then(user => {
      dispatch(setUser(user.data));
      if (cart.length > 0) {
        // if there's something in the cart, redux state wins, so update cart in DB
        axios.post('/api/users/me/cart/overwrite', { email, cart });
      } else {
        // if there's nothing in the cart, cart in DB wins, so update redux state
        dispatch(setCart(user.data.cart));
      }
      // If logged in, no localStorage - manage everything from redux state
      localStorage.removeItem('cart');
      // Extract shippingAddressOptions, and BillingOptions from db user and save in checkout redux state
      dispatch(startSetCheckout(user.data))
     
    })
    .catch(err => {
      console.log(err);
    });
};

// note: we remove cart from user object so there's no duplicate cart in redux state
export const setUser = user => ({
  type: SET_USER,
  user: _.omit(user, ['cart', 'password', 'shippingAddressOptions', 'billingOptions', 'newsletter'])
});

export const resetUser = () => ({
  type: RESET_USER
});



