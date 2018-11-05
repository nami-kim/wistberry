import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Cart from '../components/Cart';

export const PublicRoute = ({
  isAuthenticated,
  cartIsOpen,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => (
      <div>
        {cartIsOpen && <Cart />}
        <Component {...props} />
      </div>
    )}
  />
);

const mapStateToProps = state => ({
  // isAuthenticated: !!state.auth.isAuthenticated,
  cartIsOpen: !!state.cart.cartIsOpen,
  isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);
