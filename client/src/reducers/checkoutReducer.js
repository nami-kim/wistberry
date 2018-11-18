import {
  ADD_SHIPPING_ADDRESS,
  SET_SELECTED_SHIPPING_ADDRESS,
  SET_SHIPPING_ADDRESS_OPTIONS,
  SET_BILLING_OPTIONS,
  SET_NEWSLETTER,
  SET_CHECKOUT_EMAIL,
  // EDIT_SHIPPING_ADDRESS,
  HANDLE_TOKEN,
  RESET_CHECKOUT
} from '../actions/types';

const initialState = {
  shippingAddressOptions: [],
  selectedShippingAddress: {},
  email: '',
  // newsletter: false,
  token: {},
  billingOptions: [],
  selectedBilling: {}
  // orderSummary: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddressOptions: [
          ...state.shippingAddressOptions,
          action.shippingAddress
        ]
      };
    case SET_SELECTED_SHIPPING_ADDRESS:
      return {
        ...state,
        selectedShippingAddress: action.shippingAddress
      };
    case SET_SHIPPING_ADDRESS_OPTIONS:
      return {
        ...state,
        shippingAddressOptions: action.shippingAddressOptions
      };
    case SET_BILLING_OPTIONS:
      return {
        ...state,
        billingInfo: action.billingOptions
      };
    case SET_CHECKOUT_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case RESET_CHECKOUT:
      return initialState;
    case HANDLE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    // case SUBMIT_TOKEN:
    // return {
    //   ...state
    // }
    default:
      return state;
  }
};
