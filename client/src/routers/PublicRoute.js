import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import Cart from '../components/Cart';

export const PublicRoute = ({
  component: Component,
  cartIsOpen,
  products,
  skus,
  checkout,
  // loading,
  ...rest
}) => {
  const isLoading = products === null || skus === null || checkout === null;
  if (isLoading)
    return (
      <div>
        <Spinner />;
      </div>
    );
  return (
    <Route
      {...rest}
      component={props => {
        if (products.length > 0) {
          return (
            <div>
              {cartIsOpen && <Cart />}
              <Component products={products} skus={skus} {...props} />
            </div>
          );
        } else {
          return <h4>No products found...</h4>;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  products: state.product.products,
  skus: state.sku.skus,
  // productLoading: !!state.product.loading,
  // skuLoading: !!state.sku.loading,
  cartIsOpen: !!state.cart.cartIsOpen,
  checkout: state.checkout,
});

export default connect(mapStateToProps)(PublicRoute);
