import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, store } from './App';
import registerServiceWorker from './registerServiceWorker';
// import Spinner from './components/common/Spinner';
import { getAllProducts } from './actions/productActions';

// let hasRendered = false;
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};

// ReactDOM.render(<Spinner />, document.getElementById('root'));
const promise = new Promise((resolve, reject) => {
  resolve(store.dispatch(getAllProducts()))
})
  

promise.then(() => renderApp());
