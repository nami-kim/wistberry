import { ADD_SHIPPING_INFO, EDIT_SHIPPING_INFO, HANDLE_TOKEN } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  shippingInfo: {},
  token: {},
  billingInfo: {}
  // orderSummary: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHIPPING_INFO:
      return {
        ...state,
        ...action.shippingInfo
      };
    case EDIT_SHIPPING_INFO:
      return {
        ...state,
        ...action.updates
      };
    case HANDLE_TOKEN: 
    return {
      ...state,
      token: action.token
    }
    // case SUBMIT_TOKEN: 
    // return {
    //   ...state
    // }
    default:
      return state;
  }
};
