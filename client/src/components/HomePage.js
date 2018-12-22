import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { SmallButton } from './utils/Button';

export class HomePage extends Component {
  state = {};
  render() {
    const Benefit = ({ step, imgSrc, title, imgStyle, children, ...rest }) => (
      <div className="row middle-md mv5" {...rest}>
        <div className="col-xs-12 col-md-7 col-lg-7">
          <div className="row start-md mv3">
            <div className="col-xs-2 col-md-2">
              <div
                className="f1 fw5 tr light-purple mr2"
                style={{ marginTop: '-0.6rem' }}
              >
                {step}
              </div>
            </div>
            <div className="col-xs-10 col-md-10">
              <div className="f2 fw4">{title}</div>
              <div className="mt2 mid-gray">{children}</div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-5 col-lg-5">
          <div className="tc">
            <img src={imgSrc} style={imgStyle} />
          </div>
        </div>
      </div>
    );

    const benefits = [
      {
        step: 1,
        imgSrc:
          'https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-illustration-1.png',
        title: 'Pick a plant',
        text:
          'Pick from a selection of beautiful, healthy plants we source from a local nursery.',
        imgStyle: { width: '80%', marginLeft: '-50px' }
      },
      {
        step: 2,
        imgSrc:
          'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-illustration-1.png',
        title: 'Pick a pot',
        text:
          'A growing selection of premium locally crafted pots for your plants.',
        imgStyle: { width: '45%', paddingTop: '40px' }
      },
      {
        step: 3,
        imgSrc:
          'https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-illustration-2.png',
        title: 'Enjoy the potted plants delivered to your door for free!',
        text:
          'We plant it in a nutrient fortified soil, pot and package it securely, and ship it to your door via UPS',
        imgStyle: { width: '60%', marginLeft: '15px', paddingTop: '30px' }
      }
    ];

    const { products } = this.props;
    const mostPopularPlants = products.filter(product =>
      JSON.parse(product.metadata.collection).includes('most-popular-plants')
    );
    console.log(mostPopularPlants);

    return (
      <div className="f3">
        <Header productHeader={true} />
        <div>
          {/* hero */}
          <div
            className="container-wide vh-100-ns mt5"
          >
            <div className="row middle-md" style={{ height: '100%' }}>
              <div className="col-xs-12 col-sm-6 col-lg-5 col-lg-offset-1">
                <div className="pb5-ns ph4">
                  <div className="f-headline lh-solid fw5 relative">
                    <div className="pv0-l pt6">Brighten your life with plants.</div>
                    <div
                      className="dn db-ns absolute"
                      style={{
                        zIndex: '-1',
                        bottom: '-450px',
                        left: '-0px',
                        transform: 'rotate(45deg)',
                        opacity: '0.4'
                      }}
                    >
                      <img
                        src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/leaf-1.png"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div
                      className="dn db-ns absolute"
                      style={{
                        zIndex: '-1',
                        bottom: '-350px',
                        left: '-100px',
                        transform: 'rotate(-20deg)',
                        opacity: '0.4'
                      }}
                    >
                      <img
                        src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/leaf-2.png"
                        style={{ width: '60%' }}
                      />
                    </div>
                  </div>
                  <div className="mt4 mid-gray">
                    We make owning houseplants easy - all potted and delivered
                    to your door.
                  </div>
                </div>
              </div>
              <div
                className="col-xs-12 col-sm-6 col-lg-5 tc"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  height: '100%'
                }}
              >
                <div
                  className="flex justify-center items-center"
                  style={{ height: '100%' }}
                >
                  <img
                    src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-6.png"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* end: hero */}

          {/* how to */}
          <div className="container-narrow mt6">
            <div className="row">
              <div className="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                <div className="f1 lh-title fw4 tc pa4">
                  Wistberry sends stylish potted plants right to your door.
                </div>
              </div>
              <div className="col-xs-12">
                {benefits.map(({ step, imgSrc, title, text, imgStyle }, i) => (
                  <Benefit
                    step={step}
                    imgSrc={imgSrc}
                    title={title}
                    imgStyle={imgStyle}
                    key={step}
                  >
                    {text}
                  </Benefit>
                ))}
              </div>
            </div>
          </div>
          {/* end: how to */}

          {/* entry points */}
          <div className="container-wide pt6">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <Link to="/collection/most-popular-plants">
                  <div
                    className="aspect-ratio aspect-ratio--8x5 overflow-hidden"
                    style={{ zIndex: '1' }}
                  >
                    <div
                      className="aspect-ratio--object"
                      style={{
                        background:
                          'url("https://s3-us-west-2.amazonaws.com/wistberry/images/test/plants-stylish-1.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                      }}
                    />
                  </div>
                </Link>
                <div className="f3 fw4 bold mt3 ttu">Keep it stylish</div>
                <div className="f4 mid-gray">
                  Complete your space with our beautiful plants.
                </div>

                <Link
                  to="/collection/most-popular-plants"
                  className="f4 no-underline link green dim"
                >
                  Shop the collection&nbsp;&rarr;
                </Link>
              </div>
              <div className="col-xs-12 col-sm-6">
                <Link to="/collection/easy-care-plants">
                  <div
                    className="aspect-ratio aspect-ratio--8x5 overflow-hidden"
                    style={{ zIndex: '1' }}
                  >
                    <div
                      className="aspect-ratio--object"
                      style={{
                        background:
                          'url("https://s3-us-west-2.amazonaws.com/wistberry/images/test/plants-beginner-1.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                      }}
                    />
                  </div>
                </Link>
                <div className="f3 fw4 bold mt3 ttu">New to houseplants?</div>
                <div className="f4 mid-gray">
                  There's first time for everything. Here are some easy care
                  plants to begin with.
                </div>
                <Link
                  to="/collection/easy-care-plants"
                  className="f4 no-underline link green dim"
                >
                  Shop easy care plants&nbsp;&rarr;
                </Link>
              </div>
            </div>
          </div>
          {/* end: entry points */}

          {/* post popular */}
          <div className="container-main collection pv6">
            <div className="row center-xs">
              <div className="col-xs-12 col-md-8">
                <div className="f1 lh-title fw4 tc pa4 mb4">
                  Most Popular Plants
                </div>
              </div>
            </div>
            <div className="row">
              {mostPopularPlants.map(
                ({ id, name, caption, images, metadata }) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={id}>
                    <Link
                      to={`/products/${metadata.url}`}
                      className="collection__card"
                    >
                      <div className="product__image-container">
                        <img
                          src={
                            this.state[id] === undefined
                              ? this.setState(() => ({ [id]: images[0] }))
                              : this.state[id]
                          }
                          alt="most-popular-plants"
                          className="product__image"
                          onMouseEnter={() =>
                            this.setState(() => ({ [id]: images[1] }))
                          }
                          onMouseLeave={() =>
                            this.setState(() => ({ [id]: images[0] }))
                          }
                        />
                      </div>

                      <div className="product__info">
                        <span className="product__name">{name}</span>
                        <span className="product__price">$129</span>
                      </div>
                      <div className="product__caption">
                        <span className="product__caption--1">{caption}</span>
                        <span className="product__caption--2">
                          (pot + plant)
                        </span>
                      </div>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
          {/* end: post popular */}

          {/* reviews */}
          {/* <div className="container-narrow pt6">
            <div className="row center-xs">
              <div className="col-xs-12 col-md-8">
                <div className="f1 lh-title fw4 tc pa4">Reviews</div>
              </div>
            </div>
            <div className="row">
            </div>
          </div> */}
          {/* end: reviews */}
        </div>
      </div>
    );
  }
}

export default HomePage;
