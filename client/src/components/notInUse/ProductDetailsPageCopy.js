import React, { Component } from 'react';
import Header from '../Header';
import { OrangeButton } from '../utils/Button';
import {
  getAllPotProducts,
  getAllPotSkus,
  getAllBaseProducts,
  getAllBaseSkus
} from '../../actions/productActions';
import { startAddToCart, toggleCartOpen } from '../../actions/cartActions';
import { connect } from 'react-redux';

class ProductDetailPage extends Component {
  state = {
    currentPlantProduct: {},
    currentPlantImage: 0,

    allPotProducts: [],
    allBaseProducts: [],
    allBaseSkus: [],
    allPotSkus: [],

    currentPotSku: { name: '', id: '', color: '', index: 0 },
    currentBaseSku: { name: '', id: '', material: '', index: 0 },
    currentPlantSku: { id: '', price: '', image: '' }
  };
  handleAddToCartClick = () => {
    console.log(this.state.currentPlantSku.image)
    const items = [
      {
        type: 'sku',
        parent: this.state.currentPotSku.id,
        description: `Pot: ${this.state.currentPotSku.name} ${
          this.state.currentPotSku.color
          }`,
      },
      {
        type: 'sku',
        parent: this.state.currentBaseSku.id,
        description: `Base: ${this.state.currentBaseSku.name} ${
          this.state.currentBaseSku.material
          }`,
      },
      {
        type: 'sku',
        parent: this.state.currentPlantSku.id,
        description: this.state.currentPlantProduct.name,
      }
    ];
    const cartItems = [
      {
        group: {
          id: `${this.state.currentPlantSku.id}_${
            this.state.currentPotSku.id
            }_${this.state.currentBaseSku.id}`,
          plantImage: this.state.currentPlantSku.image,
          plantPrice: this.state.currentPlantSku.price,
          plantName: this.state.currentPlantProduct.name,
          potName: `Pot: ${this.state.currentPotSku.name} ${
            this.state.currentPotSku.color
            }`,
          baseName: `Base: ${this.state.currentBaseSku.name} ${
            this.state.currentBaseSku.material
            }`,
          quantity: 1
        },
        items
      }
    ];

    this.props.startAddToCart(cartItems);

    this.props.toggleCartOpen();
  };
  componentDidMount() {
    const { products, match, skus } = this.props;
    // retrieve current plant
    const currentPlantProduct = products.find(
      product => product.metadata.url === match.params.product
    );
    const plantSku = skus.find(sku => sku.product === currentPlantProduct.id);
    // retrieve pots & base products and skus
    const allPotProducts = getAllPotProducts(products);
    const allPotSkus = getAllPotSkus(allPotProducts, skus);
    const allBaseProducts = getAllBaseProducts(products);
    const allBaseSkus = getAllBaseSkus(allBaseProducts, skus);

    this.setState(() => ({
      currentPlantProduct,
      // currentPlantImage: 0,
      currentPlantSku: { id: plantSku.id, price: plantSku.price, image: plantSku.image },
      allPotProducts,
      allBaseProducts,
      allPotSkus,
      allBaseSkus,
      currentPotSku: {
        name: allPotProducts[0].name,
        color: allPotSkus[0].attributes.color,
        id: allPotSkus[0].id,
        index: 0
      },
      currentBaseSku: {
        name: allBaseProducts[0].name,
        material: allBaseSkus[0].attributes.material,
        id: allBaseSkus[0].id,
        index: 0
      }
    }));
  }

  render() {
    const { products } = this.props;

    // show all pot images and display selected pot info
    const potImages = this.state.allPotSkus.map((potSku, index) => {
      const potName = products.find(({ id }) => potSku.product === id).name;
      return (
        <div
          className={`pot-image__box ${
            index === this.state.currentPotSku.index ? 'active' : ''
            }`}
          key={index}
        >
          <div
            key={index}
            onClick={() =>
              this.setState(() => ({
                currentPotSku: {
                  name: potName,
                  id: potSku.id,
                  color: potSku.attributes.color,
                  size: potSku.attributes.size,
                  index
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
    const baseImages = this.state.allBaseSkus.map((baseSku, index) => {
      const baseName = products.find(({ id }) => baseSku.product === id).name;
      return (
        <div
          className={`base-image__box ${
            index === this.state.currentBaseSku.index ? 'active' : ''
            }`}
          key={index}
        >
          <div
            key={index}
            onClick={() =>
              this.setState(() => ({
                currentBaseSku: {
                  name: baseName,
                  id: baseSku.id,
                  material: baseSku.attributes.material,
                  size: baseSku.attributes.size,
                  index
                }
              }))
            }
            style={{
              backgroundImage: `url(${baseSku.image})`,
              width: '5.5rem',
              height: '5.5rem'
            }}
            className="background-img-styling base-images"
          />
        </div>
      );
    });

    const {
      name: plantName = '',
      caption: plantCaption = '',
      images: plantImages = [],
      description: plantDescription = ''
    } = this.state.currentPlantProduct;

    const thumbnails = plantImages.map((image, index) => (
      <div
        className={`thumbnail-image-box ${
          index === this.state.currentPlantImage ? 'active' : ''
          }`}
        key={index}
      >
        <div
          onClick={() => this.setState(() => ({ currentPlantImage: index }))}
          style={{
            backgroundImage: `url(${image})`
          }}
          className="background-img-styling thumbnail-image"
        />
      </div>
    ));

    return (
      <div>
        <Header productHeader={true} />
        <div className="container-wide">
          <div className="product">
            <div className="thumbnail-col">{thumbnails}</div>
            <div className="row">
              <div className="col-xs-12 col-md-8">
                <img
                  src={plantImages[this.state.currentPlantImage]}
                  alt="current plant"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="col-xs-12 col-md-4 product-detail">
                <div className="product-detail__header">{plantName}</div>
                <div className="product-detail__price">
                  <span className="product-detail__price--value">
                    $ {(this.state.currentPlantSku.price / 100).toFixed(0)}
                  </span>
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
                  <div className="product-detail__base-images">
                    {baseImages}
                  </div>
                </div>
                <div className="product-detail__form">
                  <OrangeButton
                    className="orangeyellow-lg-btn"
                    onClick={this.handleAddToCartClick}
                  >
                    Add To Cart
                  </OrangeButton>
                </div>
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

export default connect(
  null,
  { startAddToCart, toggleCartOpen }
)(ProductDetailPage);
