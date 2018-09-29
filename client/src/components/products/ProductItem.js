import React, { Component } from 'react';

class ProductItem extends Component {
  state = {
    currentImage: 0,
    currentSku: this.props.skus[0]
  };
  render() {
    const { id, name, caption, images, description, skus } = this.props;
    const { currentImage, currentSku } = this.state;
    const imageDisplay = images.map((image, index) => {
      return (
        <img
          key={index}
          onClick={() => this.setState(() => ({ currentImage: index }))}
          src={image}
        />
      );
    });
    const skuList = skus.map((sku, index) => {
      const { attributes } = sku;
      return (
        <div key={sku.id} onClick={() => this.setState({ currentSku: sku })}>
          {attributes.potSize}
        </div>
      );
    });

    const price = currentSku.price + '';
    const cad = price.substring(0, price.length - 2);
    const cents = price.slice(-2);

    return (
      <div key={id}>
        <div>{imageDisplay}</div>
        <img src={images[currentImage]} />
        <h2>{name}</h2>
        <h1>{caption}</h1>
        <div>
          <div>
            {cad}.{cents} {currentSku.currency.toUpperCase()}
          </div>
        </div>
        <p>{description}</p>
        <div>{skuList}</div>
        <button />
       
      </div>
    );
  }
}

export default ProductItem;
