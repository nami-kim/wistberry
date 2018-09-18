import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    let hasRendered = false;
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
