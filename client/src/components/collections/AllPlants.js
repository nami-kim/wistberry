import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import CollectionTemplate from './CollectionTemplate';
import CollectionContainer from './CollectionContainer';
import Spinner from '../common/Spinner';

class AllPlants extends Component {
  render() {
    const { products } = this.props;
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
        <h1>All Plants</h1>
        <CollectionContainer>
        {productItems}
        </CollectionContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products
});
export default connect(mapStateToProps)(AllPlants);
