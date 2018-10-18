import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  return (
    axios
      .post('/api/users/register', userData)
      // .then(res => history.push('/')) original done by Brad
      .then(res => {
        // Save to local storage
        const { token } = res.data;
        // Set token to local storage
        localStorage.setItem('jwtToken', token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current User
        dispatch(setCurrentUser(decoded));
      })
  );
};

export const loginUser = (userData, history) => dispatch => {
  return axios.post('/api/users/login', userData).then(res => {
    // Save to local storage
    const { token } = res.data;
    // Set token to local storage
    localStorage.setItem('jwtToken', token);
    // Set token to auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current User
    dispatch(setCurrentUser(decoded));
  });
};

export const checkUserEmail = (email) => {
  return axios.get(`/users?email=${encodeURIComponent(email)}`);
}


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  history.push('/login');
};

export const resetPassword = () => dispatch => {
  // To be updated!
};
