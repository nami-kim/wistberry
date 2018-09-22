import React, { Component } from 'react';

class ProductItem extends Component {
  render() {
    const { product } = this.props;
    const productImgs = product.images.map(img => {
      return <li key="img_id"><img src={img} style={{ width: 200 }} /></li>
    })
    return (
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {productImgs}
      </div>
    );
  }
}

export default ProductItem;
