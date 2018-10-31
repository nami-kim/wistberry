import axios from 'axios';
import { HANDLE_TOKEN, ADD_SHIPPING_INFO, EDIT_SHIPPING_INFO, SET_SHIPPING_INFO } from './types';
import _ from 'lodash';

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

// Checkout ShippingForm
export const addShippingInfo = shippingInfo => ({
  type: ADD_SHIPPING_INFO,
  shippingInfo
});
export const startAddShippingInfo = shippingInfo => dispatch => {
  localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
  dispatch(addShippingInfo(shippingInfo));
};

export const editShippingInfo = edits => ({
  type: EDIT_SHIPPING_INFO,
  edits
});

export const StartEditShippingInfo = edits => dispatch => {
  localStorage.setItem('shippingInfo', JSON.stringify(edits));
  dispatch(editShippingInfo(edits));
};

export const setShippingInfo = shippingInfo => ({
  type: SET_SHIPPING_INFO,
  shippingInfo
})

export const startSetShippingInfo = () => dispatch => {
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
  dispatch(setShippingInfo(shippingInfo))
}
  
