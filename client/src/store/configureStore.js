import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';
import skuReducer from '../reducers/skuReducer';
import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';
import cartReducer from '../reducers/cartReducer';
import checkoutReducer from '../reducers/checkoutReducer';
import modalReducer from '../reducers/modalReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      product: productReducer,
      sku: skuReducer,
      auth: authReducer,
      user: userReducer,
      cart: cartReducer,
      checkout: checkoutReducer,
      modal: modalReducer,
      errors: errorReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
