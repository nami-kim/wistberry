import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import Cart from '../components/Cart';

export const PrivateRoute = ({
  isAuthenticated,
  user,
  cartIsOpen,
  component: Component,
  ...rest
}) => {
  if (user === null) {
    return (
      <div>
        <Spinner />;
      </div>
    );
  } else {
    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div>
              {cartIsOpen && <Cart />}
              <Component user={user} {...props} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.isAuthenticated,
  user: state.user,
  cartIsOpen: !!state.cart.cartIsOpen
});

export default connect(mapStateToProps)(PrivateRoute);
