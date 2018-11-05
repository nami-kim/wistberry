import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { getAllProducts } from './actions/productActions';
import { getAllSkus } from './actions/skuActions';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setAuthUser, logoutUser } from './actions/authActions';
import { startSetUser } from './actions/userActions';
import { setCart } from './actions/cartActions';


const store = configureStore();

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setAuthUser(decoded));
  // Set user detail info
  store.dispatch(startSetUser(decoded.email))
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
} else {
  store.dispatch(setCart(JSON.parse(localStorage.getItem('cart')) || []))
}

class App extends Component {
  componentDidMount() {
    store.dispatch(getAllProducts());
    store.dispatch(getAllSkus());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppRouter />
        </div>
      </Provider>
    );
  }
}

export { App, store };
