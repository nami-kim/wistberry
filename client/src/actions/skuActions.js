import axios from 'axios';
import { GET_ALL_SKUS, SKU_LOADING, GET_SKU } from './types';

export const getAllSkus = () => dispatch => {
  dispatch(setSkuLoading());
  axios
    .get('/api/skus/stripe')
    .then(res =>
      dispatch({
        type: GET_ALL_SKUS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_SKUS,
        payload: null
      })
    );
};

// Product loading
export const setSkuLoading = () => {
  return {
    type: SKU_LOADING
  };
};
