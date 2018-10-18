import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';
import skuReducer from '../reducers/skuReducer';
import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import cartReducer from '../reducers/cartReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      product: productReducer,
      sku: skuReducer,
      auth: authReducer,
      errors: errorReducer,
      cart: cartReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
