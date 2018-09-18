import React, { Component } from 'react';
import productReducer from '../reducers/productReducer';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';

class HomePage extends Component {
  render() {
    const { products } = this.props.product;
    let productItems;
    
    if (products === null) {
      productItems = 'No items'
    } else {
      if (products.length > 0) {
        productItems = products.map(product => (
          <ProductItem key={product._id} product={product} />
        ));
      } else {
        productItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div>
        <h1>HomePage</h1>
        {productItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});
export default connect(mapStateToProps)(HomePage);
