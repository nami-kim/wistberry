import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Cart from '../components/Cart';
import Modal from '../components/utils/Modal'

export const PrivateRoute = ({
  isAuthenticated,
  cartIsOpen,
  modalIsOpen,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          {cartIsOpen && <Cart />}
          {modalIsOpen && <Modal />}
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.isAuthenticated,
  cartIsOpen: !!state.cart.cartIsOpen,
  modalIsOpen: !!state.modal.modalIsOpen
});

export default connect(mapStateToProps)(PrivateRoute);
