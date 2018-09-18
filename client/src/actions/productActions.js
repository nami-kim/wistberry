import axios from 'axios';
import { GET_ALL_PRODUCTS } from './types';


export const getAllProducts = () => dispatch => {
  axios.get('/api/products').then(res => dispatch({
    type: GET_ALL_PRODUCTS,
    payload: res.data
  }))
};
