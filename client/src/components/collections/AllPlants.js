import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import CollectionTemplate from './CollectionTemplate';
import CollectionContainer from './CollectionContainer';
import Spinner from '../common/Spinner';

class AllPlants extends Component {
  render() {
    const { products } = this.props.product;
    let productItems;

    if (products === null) {
      productItems = <Spinner />;
    } else {
      if (products.length > 0) {
        productItems = products.map(product => (
          <CollectionTemplate key={product._id} product={product} />
        ));
      } else {
        productItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div>
        <Header />
        <CollectionContainer>{productItems}</CollectionContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});
export default connect(mapStateToProps)(AllPlants);
