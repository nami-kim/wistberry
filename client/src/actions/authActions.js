import axios from 'axios';
import { SET_AUTH_USER, UPDATE_USER_PROFILE } from './types';
import setAuthToken from '../utils/setAuthToken';
import { startSetUser, resetUser } from './userActions';
import { resetCart } from './cartActions';
import { startSetCheckout } from './checkoutActions';

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
        // Set current AuthUser
        dispatch(setAuthUser(decoded));
        // Set current User
        const { user } = res.data;
        dispatch(startSetUser(user.email));
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
    // Set current UserAuth
    dispatch(setAuthUser(decoded));
    // Set current User (in userReducer)
    const { user } = res.data;
    dispatch(startSetUser(user.email));
  });
};
export const updateUserProfile = updates => ({
  type: UPDATE_USER_PROFILE,
  updates
});

export const startUpdateUserProfile = (email, updates) => dispatch => {
  console.log('this is running')
  return axios
    .put('/api/users/me/profile', { email, updates })
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current AuthUser
      dispatch(setAuthUser(decoded));
      // Set current User
      const { user } = res.data;
      dispatch(startSetUser(user.email));
      dispatch(updateUserProfile(updates));
    });
};

export const checkUserEmail = email => {
  return axios.get(`/api/users/user-exists?email=${encodeURIComponent(email)}`);
};

export const setAuthUser = decoded => ({
  type: SET_AUTH_USER,
  decoded
});

export const logoutUser = history => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setAuthUser({}));
  dispatch(resetUser());
  dispatch(resetCart());
  history.push('/login');
};

export const resetPassword = () => dispatch => {
  // To be updated!
};
