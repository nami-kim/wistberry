import axios from 'axios';
import { HANDLE_TOKEN } from './types';

export const handleToken = (token) => dispatch => {
  dispatch({
    type: HANDLE_TOKEN,
    token
  })
}

export const submitToken = (token, order) => {
  return axios.post('/api/billing/stripe', { token, order }).then(res => res.data);
};