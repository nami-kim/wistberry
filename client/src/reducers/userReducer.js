import { SET_USER, RESET_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  shippingInfo: [],
  orderHistory: [],
  billingInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};
