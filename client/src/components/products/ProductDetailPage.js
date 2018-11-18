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
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';

const SingleCard = ({ icon, children, className, style, ...rest }) => (
  <div
    className={`col-xs-12 col-md-3 ba b--washed-red no-gutter ${className}`}
    style={{ backgroundColor: 'rgba(255,255,255,0.7)', marginRight: '-1px', marginTop: '-1px', ...style }}
    {...rest}
  >
    <div className="flex flex-column justify-between pa5" style={{ height: '320px' }}>
      {/* content */}
      <div className="dark-gray">
        {children}
      </div>
      {/* end: content */}

      {/* icon */}
      <div className="tr">
        <Icon
          width="40"
          height="40"
          paths={ICON_PATHS[icon]}
          pathStyle={{ strokeWidth: '0.2', stroke: '#222' }}
        // viewBox="0 0 32 32"
        />
      </div>
      {/* end: icon */}
    </div>
  </div>
)
const DoubleCard = ({ children, className, style, ...rest }) => (
  <div
    className={`col-xs-12 col-md-6 ba b--washed-red no-gutter ${className}`}
    style={{ backgroundColor: 'rgba(255,255,255,0.7)', marginTop: '-1px', ...style }}
    {...rest}
  >
    <div className="pa5" style={{ height: '320px' }}>
      {children}
    </div>
  </div>
)

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

    /* More details section */
    const includedInPackage = [
      'Plant',
      'Pot',
      'Wooden base',
      'Care instructions',
      'Free shipping via UPS',
    ]
    const potAndBaseImages = [
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-2.png',
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-2.png',
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-2.png',
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-2.png',
    ]
    const otherBenefits = [
      {
        icon: 'refund',
        title: '100%, 30-day Moneyback Guarantee',
        text: ''
      }
    ]

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

        {/* <div className="product-banner" />
        <div className="product-instagram" />
        <div className="product-review" /> */}

        {/* plant details */}
        <div className="container-wide bg-lightest-pink f4 pv5">
          <div className="row">
            <SingleCard icon="sun">
              <div className="f3 fw5 mb2">Light: Low</div>
              <div>Store away from windows</div>
            </SingleCard>
            <SingleCard icon="drop2">
              <div className="f3 fw5 mb2">Water: Low</div>
              <div>Water 200ml once a week</div>
            </SingleCard>
            <DoubleCard>
              <div className="f3 fw5 mb2">About {plantName}</div>
              <div>{plantDescription}</div>
            </DoubleCard>
          </div>
          <div className="row">
            <SingleCard icon="paw">
              <div className="f3 fw5 mb2">Pet Safe: No</div>
              <div>Watch this plant around pets - could be mildly toxic if ingested</div>
            </SingleCard>
            <SingleCard icon="cube">
              <div className="f3 fw5 mb2">What's Included</div>
              <ul className="ml4">
                {includedInPackage.map(item => (
                  <li className="mb2" key={item}>{item}</li>
                ))}
              </ul>
            </SingleCard>
            <DoubleCard>
              <div className="row" style={{ height: '100%' }}>
                <div className="col-xs-12 col-md-5">
                  <div className="f3 fw5 mb2">Plant Height</div>
                  <ul className="ml4">
                    <li className="mb2">Table top size</li>
                    <li className="mb2">1.5 - 2ft including the base</li>
                  </ul>
                </div>
                <div className="col-xs-12 col-md-7">
                  <div
                    style={{
                      background: 'url("https://s3-us-west-2.amazonaws.com/wistberry/images/test/interior-design-17.jpg")',
                      backgroundSize: 'cover',
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </DoubleCard>
          </div>
        </div>
        {/* end: plant details */}

        {/* premium pots + bases */}
        <div className="container-narrow f4 pv6">
          <div className="tc">
            <div className="f1 lh-title fw4 mb3">Premium pots + hardwood bases</div>
            <div className="mb5 gray">Our premium pots and hardwood bases are locally crafted and finished to the highest quality.</div>
          </div>
          <div className="row">
            {potAndBaseImages.map((imgSrc, i) => (
              <div className="col-xs-12 col-md-6" style={{ marginTop: '2.5rem' }}>
                <div className="flex items-center justify-center pa5" style={{ backgroundColor: '#fafafa' }}>
                  <img src={imgSrc} style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end: premium pots + bases */}

        {/* other benefits */}
        <div className="container-wide bg-lightest-pink f4 pv5">
          <div className="row">
            {otherBenefits.map(({ icon, title, text }, i) => (
              <div className="col-xs-12 col-md-4"></div>
            ))}
          </div>
        </div>
        {/* end: other benefits */}


      </div>
    );
  }
}

export default connect(
  null,
  { startAddToCart, toggleCartOpen }
)(ProductDetailPage);