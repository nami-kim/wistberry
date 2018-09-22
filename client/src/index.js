import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App, store } from './App';
import registerServiceWorker from './registerServiceWorker';
import Spinner from './components/common/Spinner';

let hasRendered = false;

ReactDOM.render(<Spinner />, document.getElementById('root'));

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
    hasRendered = true;
  }
};

renderApp();
