import { GET_ALL_PRODUCTS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  product: null,
  products: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  
    case GET_ALL_PRODUCTS:
    return {
      ...state,
      products: action.payload
    }
    default:
      return state;
  }
};
