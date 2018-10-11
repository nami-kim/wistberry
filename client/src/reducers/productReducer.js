import { PRODUCT_LOADING, GET_ALL_PRODUCTS, GET_PRODUCT } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  product: null,
  products: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_PRODUCTS:
    return {
      ...state,
      products: action.payload,
      loading: false,
    }
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      }
    default:
      return state;
  }
};
