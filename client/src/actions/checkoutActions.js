import axios from 'axios';
import {
  HANDLE_TOKEN,
  ADD_SHIPPING_ADDRESS,
  EDIT_SHIPPING_ADDRESS,
  SET_SHIPPING_ADDRESS_OPTIONS,
  SET_SELECTED_SHIPPING_ADDRESS,
  SET_BILLING_INFO,
  SET_NEWSLETTER,
  SET_CHECKOUT_EMAIL
} from './types';
import _ from 'lodash'

// Stripe Billing
export const handleToken = token => dispatch => {
  dispatch({
    type: HANDLE_TOKEN,
    token
  });
};

export const submitToken = (token, order) => {
  // const token = this.getState().checkout.token.id;

  // const order = {
  //   currency: 'cad',
  //   items: [
  //     {
  //       type: 'sku',
  //       parent: 'sku_Dfd8fekKmrtZTU'
  //     }
  //   ],
  //   shipping: {
  //     name: 'Jenny Rosen',
  //     address: {
  //       line1: 'Unit 808',
  //       city: 'Vancouver',
  //       state: 'ON',
  //       country: 'CA',
  //       postal_code: 'V6E 0B1'
  //     }
  //   },
  //   email: 'jenny.rosen@example.com'
  // };
  return axios
    .post('/api/billing/stripe', { token, order })
    .then(res => console.log(res.data));
};

// Checkout AddressForm
export const addShippingAddress = shippingAddress => ({
  type: ADD_SHIPPING_ADDRESS,
  shippingAddress
});
export const setSelectedShippingAddress = shippingAddress => ({
  type: SET_SELECTED_SHIPPING_ADDRESS,
  shippingAddress: _.omit(shippingAddress, ['_id'])
});
export const startAddShippingAddress = shippingAddress => (
  dispatch,
  getState
) => {
  console.log('startAddShippingAddress running!');
  if (shippingAddress.defaultShippingAddress) {
    const newShippingAddressOptions = getState().checkout.shippingAddressOptions.map(
      shippingAddress => ({ ...shippingAddress, defaultShippingAddress: false })
    );
    console.log(newShippingAddressOptions)
    dispatch(setShippingAddressOptions(newShippingAddressOptions));
  }
  const { isAuthenticated, authUser } = getState().auth;
  if (isAuthenticated) {
    axios.post('/api/users/me/shipping-address', {
      email: authUser.email,
      shippingAddress
    });
  }
  dispatch(addShippingAddress(shippingAddress));
  dispatch(setSelectedShippingAddress(shippingAddress));
};

// export const editShippingAddress = edits => ({
//   type: EDIT_SHIPPING_ADDRESS,
//   edits
// });

// export const StartEditShippingAddress = edits => dispatch => {
//   localStorage.setItem('shippingAddress', JSON.stringify(edits));
//   dispatch(editShippingAddress(edits));
// };
export const startSetCheckout = user => dispatch => {
  console.log(user);
  const defaultShippingAddress =
    user.shippingAddressOptions.find(shippingAddress => {
      return shippingAddress.defaultShippingAddress === true;
    }) || {};
  console.log(defaultShippingAddress);
  dispatch(setShippingAddressOptions(user.shippingAddressOptions));
  dispatch(setSelectedShippingAddress(defaultShippingAddress));
  dispatch(setBillingInfo(user.billingInfo));
  dispatch(setNewsletter(user.newsletter));
  dispatch(setCheckoutEmail(user.email));
};
// set shippingAddressOptions when login
export const setShippingAddressOptions = shippingAddressOptions => ({
  type: SET_SHIPPING_ADDRESS_OPTIONS,
  shippingAddressOptions: _(shippingAddressOptions)
    .map(address => (_.omit(address, ['_id'])))
    .sortBy(['defaultShippingAddress'])
    .reverse()
    .valueOf()
});
export const setBillingInfo = billingInfo => ({
  type: SET_BILLING_INFO,
  billingInfo
});
export const setNewsletter = newsletter => ({
  type: SET_NEWSLETTER,
  newsletter
});
export const setCheckoutEmail = email => ({
  type: SET_CHECKOUT_EMAIL,
  email
});

// export const startSetShippingAddress = () => dispatch => {
//   const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
//   dispatch(setShippingAddress(shippingAddress));
// };
