import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import Header from '../components/Header';
import Cart from '../components/Cart';
import Modal from '../components/utils/Modal';

export const AsyncRoute = ({
  component: Component,
  cartIsOpen,
  modalIsOpen,
  products,
  skus,
  loading,
  ...rest
}) => {
  if (products === null || skus === null || loading)
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
  productLoading: !!state.product.loading,
  skuLoading: !!state.sku.loading,
  cartIsOpen: !!state.cart.cartIsOpen
});

export default connect(mapStateToProps)(AsyncRoute);
