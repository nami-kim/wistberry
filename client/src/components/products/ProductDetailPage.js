import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import _ from 'lodash';
import {
  getAllPotProducts,
  getAllPotSkus,
  getAllBaseProducts,
  getAllBaseSkus
} from '../../actions/productActions';

class ProductDetailPage extends Component {
  state = {
    currentPlantImage: 0,
    currentPotSku: { name: '', id: '', color: '', size: '' },
    currentBaseSku: { name: '', id: '', material: '', size: '' },
    currentPlantSku: { id: '', quantity: 0 }
  };

  addItemsToCart = () => {
    const orderSkuObject = {
      plantSku: this.state.currentPlantSku,
      potSku: this.state.currentPotSku,
      baseSku: this.state.currentBaseSku
    };
  };

  render() {
    const { products, match, skus } = this.props;
    const { currentPlantImage } = this.state;

    // retrieve current plant
    const currentPlantProduct = products.find(
      product => product.metadata.url === match.params.product
    );

    // skus.find(sku => sku.product === currentPlantProduct.id).then(sku =>
    //   this.setState(() => ({
    //     plantSku: { id: sku.id }
    //   }))
    // );

    // retrieve pots & base products and skus
    const allPotProducts = getAllPotProducts(products);
    const allPotSkus = getAllPotSkus(allPotProducts, skus);
    const allBaseProducts = getAllBaseProducts(products);
    const allBaseSkus = getAllBaseSkus(allBaseProducts, skus);

    // show all pot images and display selected pot info
    const potImages = allPotSkus.map((potSku, index) => {
      const potName = products.find(({ id }) => potSku.product === id).name;
      return (
        <div
          className={`pot-image__box ${
            potSku.id === this.state.currentPotSku.id ? 'active' : ''
          }`}
        >
          <div
            key={index}
            onClick={() =>
              this.setState(() => ({
                currentPotSku: {
                  name: potName,
                  id: potSku.id,
                  color: potSku.attributes.color,
                  size: potSku.attributes.size
                }
              }))
            }
            style={{
              backgroundImage: `url(${potSku.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              overflow: 'hidden',
              width: '5.5rem',
              height: '5.5rem'
            }}
            className="pot-images"
          />
        </div>
      );
    });

    // show all base images and display selected base info
    const baseImages = allBaseSkus.map((baseSku, index) => {
      const baseName = products.find(({ id }) => baseSku.product === id).name;
      return (
        <div
          className={`base-image__box ${
            baseSku.id === this.state.currentBaseSku.id ? 'active' : ''
          }`}
        >
          <div
            key={index}
            onClick={() =>
              this.setState(() => ({
                currentBaseSku: {
                  name: baseName,
                  id: baseSku.id,
                  material: baseSku.attributes.material,
                  size: baseSku.attributes.size
                }
              }))
            }
            style={{
              backgroundImage: `url(${baseSku.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              overflow: 'hidden',
              width: '5.5rem',
              height: '5.5rem'
            }}
            className="base-images"
          />
        </div>
      );
    });

    const {
      name: plantName,
      caption: plantCaption,
      images: plantImages,
      description: plantDescription
    } = currentPlantProduct;

    const thumbnails = plantImages.map((image, index) => (
      <div
        className={`thumnail-image-box ${
          index === this.state.currentPlantImage ? 'active' : ''
        }`}
      >
        <div
          key={index}
          onClick={() => this.setState(() => ({ currentPlantImage: index }))}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            overflow: 'hidden',
            width: '9rem',
            height: '9rem'
          }}
          className="thumnail-image"
        />
      </div>
    ));

    return (
      <div>
        <Header productHeader={true} />
        <div className="container">
          <div className="row product">
            <div className="col-md-8 product-images">
              <div className="row product-images">
                <div className="col-md-2 product-images__thumnail">
                  {thumbnails}
                </div>
                <div className="col-md-10 product-images__main-image">
                  <img
                    src={plantImages[currentPlantImage]}
                    alt="current plant"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 product-detail">
              <div className="product-detail__header">{plantName}</div>
              <div className="product-detail__price">
                <span className="product-detail__price--value">$ 129</span>
                <span className="product-detail__price--currency"> CAD</span>
              </div>
              <div className="product-detail__caption">{plantCaption}</div>
              <div className="product-detail__description">
                {plantDescription}
              </div>
              <div className="product-detail__pot-selection">
                <div className="product-detail__selected-pot">
                  <span className="product-detail__selected-pot--style">
                    Pot Style:{' '}
                  </span>
                  <span className="product-detail__selected-pot--name">
                    {this.state.currentPotSku.name} (
                    {this.state.currentPotSku.color})
                  </span>
                </div>
                <div className="product-detail__pot-images">{potImages}</div>
              </div>
              <div className="product-detail__base-selection">
                <div className="product-detail__selected-base">
                  <span className="product-detail__selected-base--style">
                    Base Style:{' '}
                  </span>
                  <span className="product-detail__selected-base--name">
                    {this.state.currentBaseSku.name} (
                    {this.state.currentBaseSku.material})
                  </span>
                </div>
                <div className="product-detail__base-images">{baseImages}</div>
              </div>
              <div className="product-detail__form">
                <Link to="/cart">
                  <button
                    className="product-detail__add-to-cart-btn"
                    onClick={this.addItemsToCart}
                  >
                    Add To Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="product-banner" />
        <div className="product-instagram" />
        <div className="product-review" />
      </div>
    );
  }
}

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

// <form>
//   <label htmlFor="Quantity">Quantity</label>
//   <div>
//     <button>-</button>
//     <input type="text" />
//     <button>+</button>
//   </div>
//
// </form>
