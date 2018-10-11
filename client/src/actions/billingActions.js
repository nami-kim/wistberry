import axios from 'axios';
import { HANDLE_TOKEN } from './types';

export const handleToken = token => async dispatch => {
  axios.post('/api/billing/stripe', token).then((res) => {
    dispatch({
      type: HANDLE_TOKEN,
      payload: res.data
    })
    .catch(err => res.status(400).send(err))
  })
  
};
