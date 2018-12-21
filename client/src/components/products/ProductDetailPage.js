import React, { Component } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
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
import { SmallButton } from '../utils/Button';
import YouMayAlsoLike from '../collections/YouMayAlsoLike';

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
    console.log(this.state.currentPlantSku.image);
    const items = [
      {
        type: 'sku',
        parent: this.state.currentPotSku.id,
        description: `Pot: ${this.state.currentPotSku.name} ${
          this.state.currentPotSku.color
        }`
      },
      {
        type: 'sku',
        parent: this.state.currentBaseSku.id,
        description: `Base: ${this.state.currentBaseSku.name} ${
          this.state.currentBaseSku.material
        }`
      },
      {
        type: 'sku',
        parent: this.state.currentPlantSku.id,
        description: this.state.currentPlantProduct.name
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
      currentPlantSku: {
        id: plantSku.id,
        price: plantSku.price,
        image: plantSku.image
      },
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
    const plantCare = [
      {
        icon: 'sun',
        iconSolid: 'sunSolid',
        iconSolidColor: '#FFF0A9',
        title: 'Light: Low',
        description: 'Store away from windows'
      },
      {
        icon: 'drop2',
        iconSolid: 'drop2Solid',
        iconSolidColor: '#CAEAF9',
        title: 'Water: Low',
        description: 'Water 200ml once a week'
      },
      {
        icon: 'paw',
        iconSolid: 'pawSolid',
        iconSolidColor: '#D6A787',
        title: 'Pet Safe: No',
        description:
          'Watch this plant around pets - could be mildly toxic if ingested'
      }
    ];
    const includedInPackage = [
      'Plant',
      'Pot',
      'Wooden base',
      'Care instructions',
      'Free shipping via UPS'
    ];
    const potAndBaseImages = [
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-4.jpg',
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-3.jpg',
      'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-5.jpg'
    ];
    const wistberryBenefits = [
      {
        step: 1,
        imgSrc:
          'https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-6.png',
        title: 'Pick A Plant You Love',
        text: 'Pick one of our beautiful plants.'
      },
      {
        step: 2,
        imgSrc:
          'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-2.png',
        title: 'Pick A Premium Pot',
        text:
          'Pick a top quality, locally crafted pot in our collection. New collections are coming soon!'
      },
      {
        step: 3,
        imgSrc:
          'https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-8.png',
        title: 'Potted + Delivered to Your Door',
        text:
          "No more trips to collect plants, pots, soil, etc... It's all done for you and delivered to your door."
      }
    ];
    const Benefit = ({ step, imgSrc, title, children, ...rest }) => (
      <div className="col-xs-12 col-md-4 col-lg-4 mv4">
        <div className="flex flex-column items-center tc">
          <div
            className="flex justify-center items-center ba bw1 br-100 b--white overflow-hidden mb4"
            style={{ width: '48px', height: '48px' }}
          >
            <div className="f1 fw3" style={{ paddingTop: '6px' }}>
              {step}
            </div>
          </div>
          <div className="f2 ph3">{title}</div>
          <div className="mt2 ph3 white">{children}</div>
        </div>
      </div>
    );
    const otherBenefits = [
      {
        icon: 'refund',
        title: '30-day Moneyback Guarantee',
        text:
          "If you're not in love with your plant, you'll receive 100% of your money back. No questions asked."
      },
      {
        icon: 'truck',
        title: 'Free UPS Shipping & Return',
        text:
          'Nationwide free shipping and return included for everyone in Canada.'
      },
      {
        icon: 'lifebuoy',
        title: 'Expert Help - Forever.',
        text:
          "Living with plants don't have to be hard. Get expert help and keep them alive and healthy!"
      }
    ];
    // const reviews = [
    //   {
    //     name: 'John Doe',
    //     rating: 5,
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec augue et elit rhoncus pharetra. Mauris interdum hendrerit velit pharetra placerat. Nullam lorem ligula, tempus et lectus sit amet, vehicula lobortis velit.'
    //   },
    //   {
    //     name: 'John Doe',
    //     rating: 5,
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec augue et elit rhoncus pharetra. Mauris interdum hendrerit velit pharetra placerat. Nullam lorem ligula, tempus et lectus sit amet, vehicula lobortis velit.'
    //   },
    //   {
    //     name: 'John Doe',
    //     rating: 5,
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec augue et elit rhoncus pharetra. Mauris interdum hendrerit velit pharetra placerat. Nullam lorem ligula, tempus et lectus sit amet, vehicula lobortis velit.'
    //   },
    //   {
    //     name: 'John Doe',
    //     rating: 5,
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec augue et elit rhoncus pharetra. Mauris interdum hendrerit velit pharetra placerat. Nullam lorem ligula, tempus et lectus sit amet, vehicula lobortis velit.'
    //   },
    // ]
    // const Review = ({name, rating, text}) => (
    //   <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
    //
    //   </div>
    // )

    return (
      <div className="HurmeGeometricSans3">
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

        {/* plant care */}
        <div
          className="container-wide f4 pv6"
          style={{ backgroundColor: '#fafafa' }}
        >
          <div className="row">
            <div className="col-xs-12 col-md-5 col-md-offset-1 col-lg-6 col-lg-offset-1">
              <div className="mb5">
                <div className="f2 near-black fw4 mb3">About {plantName}</div>
                <div className="near-black">{plantDescription}</div>
              </div>
              <div className="mb5">
                <div className="f2 fw4 mb3">What's Included</div>
                <ul className="ml4">
                  {includedInPackage.map(item => (
                    <li className="mb2" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb5">
                <div className="f2 fw4 mb3">Plant Height</div>
                <ul className="ml4">
                  <li className="mb2">Table top size</li>
                  <li className="mb2">1.5 - 2ft including the base</li>
                </ul>
              </div>
              <div className="mb5">
                <div className="f2 fw4 mb3">Care Guide</div>
                <ul className="ml4">
                  <Link to="" className="mid-gray">
                    <li className="mb2">Learn how to care for {plantName}</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-md-4 col-md-offset-1 col-lg-3 col-lg-offset-1 first-md">
              {plantCare.map(
                ({ icon, iconSolid, iconSolidColor, title, description }) => (
                  <div className="bg-white pa5 mb3 flex flex-column items-center tc">
                    <div
                      className="relative"
                      style={{ width: '56px', height: '56px' }}
                    >
                      <Icon
                        width="56"
                        height="56"
                        className="absolute mb2"
                        style={{ top: '0', left: '0', zIndex: '1' }}
                        paths={ICON_PATHS[icon]}
                      />
                      <Icon
                        width="56"
                        height="56"
                        className="absolute mb2"
                        style={{ top: '4px', left: '4px', zIndex: '0' }}
                        pathStyle={{ fill: iconSolidColor }}
                        paths={ICON_PATHS[iconSolid]}
                      />
                    </div>
                    <div className="near-black f3 fw4 ph3">{title}</div>
                    <div className="mid-gray ph3">{description}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* end: plant care */}

        {/* premium pots + bases */}
        <div className="container-wide f4 pv6">
          <div className="tc">
            <div className="f1 lh-title fw4 mb3">
              Premium Pot + Top Quality Wooden Base
            </div>
            <div className="mb5 mid-gray">
              Our premium ceramic pots are high fired and matte finished. <br />
              The bases are beautiful dark walnut wood with a soft-touch finish.
              <br />
              Locally crafted and hand finished to the highest quality.
            </div>
          </div>
          <div className="row">
            {potAndBaseImages.map((imgSrc, i) => (
              <div
                className="col-xs-12 col-md-4"
                style={{ marginTop: '2.5rem' }}
              >
                <div className="flex items-center justify-center">
                  <img src={imgSrc} style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end: premium pots + bases */}

        {/* easy */}
        <div className="container-wide bg-orange-gradient white f4 pv6">
          <div className="tc">
            <div className="f1 lh-title fw4 mb4">
              Houseplants Can Be This Easy.
            </div>
          </div>
          <div className="row">
            {wistberryBenefits.map(({ step, imgSrc, title, text }, i) => (
              <Benefit step={step} imgSrc={imgSrc} title={title} key={step}>
                {text}
              </Benefit>
            ))}
          </div>
        </div>
        {/* end: easy */}

        {/* other benefits */}
        <div
          className="container-wide f4 pv6"
          style={{ backgroundColor: '#fafafa' }}
        >
          <div className="tc">
            <div className="f1 near-black lh-title fw4 mb4">
              Love It or Your Money Back.
            </div>
          </div>
          <div className="row">
            {otherBenefits.map(({ icon, title, text }, i) => (
              <div className="col-xs-12 col-md-4 mv4">
                <div className="flex flex-column items-center tc">
                  <Icon
                    width="64"
                    height="64"
                    className="mb3"
                    paths={ICON_PATHS[icon]}
                    pathStyle={{ strokeWidth: '0', fill: '#1d1d1d' }}
                  />
                  <div className="f2 ph3 near-black">{title}</div>
                  <div className="mt2 ph3 mid-gray">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end: other benefits */}

        {/* reviews */}
        {/* <div className="container-wide f4 pv6">
          <div className="tc">
            <div className="f1 lh-title fw4 mb4">Don't Take Our Word for It</div>
          </div>
          <div className="row">
          </div>
        </div> */}
        {/* end: reviews */}
        {/* other suggestion */}
        <div className="container-wide f4 pv6">
          <div className="tc">
            <div className="f1 near-black lh-title fw4 mb3">
              You might also like
              <YouMayAlsoLike collection="easy-care-plants" />
            </div>
          </div>
        </div>
        {/* end: shop */}
        {/* shop */}
        <div className="container-wide f4 pv6">
          <div className="tc">
            <div className="f1 near-black lh-title fw4 mb3">
              Ready to Bring Your Space to Life?
            </div>
            <div className="mb4 mid-gray">
              It's time to breathe some life into your space with greenery!
            </div>
            <OrangeButton style={{ display: 'inline-block', width: 'auto' }}>
              Shop Now
            </OrangeButton>
            <div>
              <img
                src="http://wistberry.imgix.net/images/illustration/Untitled_Artwork.png"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* end: shop */}
      </div>
    );
  }
}

export default connect(
  null,
  { startAddToCart, toggleCartOpen }
)(ProductDetailPage);
