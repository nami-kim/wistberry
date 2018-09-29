import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import Header from '../components/Header';

export const AsyncRoute = ({
  component: Component,
  products,
  skus,
  loading,
  ...rest
}) => {
  if (products === null || skus === null || loading)
    return (
      <div>
        <Header />
        <Spinner />;
      </div>
    );
  return (
    <Route
      {...rest}
      component={props => {
        if (products.length > 0) {
          return <Component products={products} skus={skus} {...props} />;
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
  skuLoading: !!state.sku.loading
});

export default connect(mapStateToProps)(AsyncRoute);