import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';
import skuReducer from '../reducers/skuReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      product: productReducer,
      sku: skuReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
