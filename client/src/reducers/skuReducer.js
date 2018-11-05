import { SKU_LOADING, GET_ALL_SKUS, GET_SKU } from '../actions/types';

const initialState = {
  sku: null,
  skus: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SKU_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_SKUS:
      return {
        ...state,
        skus: action.payload,
        loading: false,
      }
    case GET_SKU:
      return {
        ...state,
        skus: action.payload,
        loading: false
      }
    default:
      return state;
  }
};
