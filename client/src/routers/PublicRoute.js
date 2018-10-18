import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Cart from '../components/Cart';
import Modal from '../components/utils/Modal';

export const PublicRoute = ({
  // isAuthenticated,
  modalIsOpen,
  cartIsOpen,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => (
      <div>
        {cartIsOpen && <Cart />}
        {cartIsOpen && <Cart />}
        <Component {...props} />
      </div>
    )}
  />
);

const mapStateToProps = state => ({
  // isAuthenticated: !!state.auth.isAuthenticated,
  cartIsOpen: !!state.cart.cartIsOpen
});

export default connect(mapStateToProps)(PublicRoute);
