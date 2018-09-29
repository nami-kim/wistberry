import axios from 'axios';
import { GET_ALL_PRODUCTS, PRODUCT_LOADING, GET_PRODUCT } from './types';

export const getAllProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get('/api/products/stripe')
    .then(res =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: null
      })
    );
};

// Product loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
