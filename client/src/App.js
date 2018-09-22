import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { getAllProducts } from './actions/productActions';

const store = configureStore();

class App extends Component {
  componentDidMount() {
    store.dispatch(getAllProducts());
  }
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
