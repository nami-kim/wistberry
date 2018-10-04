import React, { Component } from 'react';
import Header from '../Header';
import _ from 'lodash';

class ProductDetailPage extends Component {
  state = {
    currentPlantImage: 0,
    currentPotImage: 0,
    currentBaseImage: 0,
    orderSkuObject: {
      plantSku: {
        id: '',
        quantity: 0
      },
      potSku: {
        id: '',
        quantity: 0
      },
      baseSku: {
        id: '',
        quantity: 0
      }
    }
  };
  render() {
    const { products, match, skus } = this.props;
    const {
      currentPlantImage,
      currentPotImage,
      currentBaseImage,
      currentSku
    } = this.state;
    // current plant
    const currentPlant = products.find(
      product => product.metadata.url === match.params.product
    );
    const plantSkus = skus.find(sku => sku.product === currentPlant.id);

    // all pots
    const allPotProducts = products.filter(
      product => product.metadata.type === 'pot'
    );
    const allPotSkus = _.flatMap(allPotProducts, pot =>
      skus.filter(sku => sku.product === pot.id)
    );

    const potImages = allPotSkus.map((potSku, index) => (
      <div>
        <img
          key={index}
          onClick={() => this.setState(() => ({ currentPotImage: index }))}
          src={potSku.image}
        />
      </div>
    ));

    // all bases
    const allBaseProducts = products.filter(
      product => product.metadata.type === 'base'
    );
    const allBaseSkus = _.flatMap(allBaseProducts, base =>
      skus.filter(sku => sku.product === base.id)
    );

    const baseImages = allBaseSkus.map((baseSku, index) => (
      <div>
        <img
          key={index}
          onClick={() => this.setState(() => ({ currentBaseImage: index }))}
          src={baseSku.image}
        />
      </div>
    ));

    const {
      name: plantName,
      caption: plantCaption,
      images: plantImages,
      description: plantDescription,
      metadata: plantMetadata
    } = currentPlant;

    const thumbnails = plantImages.map((image, index) => (
      <img
        key={index}
        onClick={() => this.setState(() => ({ currentPlantImage: index }))}
        src={image}
        style={{ width: '100%' }}
      />
    ));

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-2">{thumbnails}</div>
                <div className="col-lg-10">
                  <img
                    src={plantImages[currentPlantImage]}
                    alt="current plant"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 product-detail">
              <div className="product-detail__header">{plantName}</div>
              <div className="product-detail__caption">{plantCaption}</div>
              <div className="product-detail__description">
                {plantDescription}
              </div>
              <div className="product-detail__pot-selection">
                <div className="product-detail__pot-images">{potImages}</div>
              </div>
              <div className="product-detail__base-selection">
                <div className="product-detail__base-images">{baseImages}</div>
              </div>
              <div className="product-detail__form">
                <form>
                  <label htmlFor="Quantity">Quantity</label>
                  <div>
                    <button>+</button>
                    <input type="text" />
                    <button>-</button>
                  </div>
                  <button>Add To Cart</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

<img
  class="thumbnails-carousel__image"
  src="//cdn.allbirds.com/image/fetch/q_auto,f_auto/q_auto,f_auto,b_rgb:F2F2F2/https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_August_ReFresh_WL_RN_Tuke_Jam_MED_3fb30925-5354-4c07-aac2-a53b3a529b36_120x120.png%3Fv%3D1534272340"
  alt="[SQUARE]:Tuke Jam (Jam Sole)"
/>;
export default ProductDetailPage;

// <ProductOnHover onHover={<div> Show this on hover </div>}>
//   <div> Show on no hover </div>
// </ProductOnHover>

// <div className="product-detail">
//

//
// <div className="product-story">
//   {plantMetadata.water}
//   {plantMetadata.light}
//   {plantMetadata.story}
// </div>
