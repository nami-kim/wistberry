import axios from 'axios';
// import { HANDLE_TOKEN } from './types';

export const handleToken = (token, order) => {
  return axios.post('/api/billing/stripe', {token, order}).then(res => res.data);
};
