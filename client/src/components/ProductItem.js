import React, { Component } from 'react';

class ProductItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    );
  }
}

export default ProductItem;
