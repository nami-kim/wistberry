import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      product: productReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
