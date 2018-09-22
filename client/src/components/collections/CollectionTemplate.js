import React, { Component } from 'react';

class CollectionTemplate extends Component {
  render() {
    const { product } = this.props;
    const { name, description, images } = product;
    // const productImgs = images.map(img => {
    //   return (
    //     <li key="img_id">
    //       <img src={img} className="collection__image"/>
    //     </li>
    //   );
    // });
    const productImgs = <img src={`${images[0]}`} className="collection__image"/>

    return (
      <div className="collection__card">
        <div>{productImgs}</div>
        <div className="collection__name">{name}</div>
        <div className="collection__description">{description}</div>
      </div>
    );
  }
}

export default CollectionTemplate;
