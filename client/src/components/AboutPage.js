import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';

const AboutPage = ({ products }) => {
  const mostPopularPlants = products.filter(product => JSON.parse(product.metadata.collection).includes('most-popular-plants'))
  console.log(products)
  console.log(mostPopularPlants)

  const Step = ({ children, width = '52px', height = '52px' }) => (
    <div className="flex items-center justify-center f2 ba pa3" style={{ borderRadius: '100px', width, height }}>
      <div>{children}</div>
    </div>
  )

  return (
    <div className="f3">
      <Header defaultHeader={true} />

      {/* hero */}
      <div
        className="flex items-center justify-center"
        style={{
          paddingTop: '6.6rem',
          height: '480px',
          background: `url("https://s3-us-west-2.amazonaws.com/wistberry/images/test/interior-design-4.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}>
        <h1 className="f-subheadline lh-title i white tc" style={{ textShadow: '3px 3px rgba(0,0,0,0.4)' }}>Keep In Touch with Nature.<br />Even at Home.</h1>
      </div>
      {/* end: hero */}

      <div className="container-narrow pt6">

        <div className="row middle-sm">
          <div className="col-xs-12 col-md-6 col-lg-7">
            <div className="f2 tc i ph4">"One of our greatest joys in life is walking our dogs in Stanley Park everyday. Every time we’re in the midst of the trees and the plants, we forget about everything else. Then we wondered: why should this be for only an hour a day?"</div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-5 mv5 first-sm">
            <img src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/dogs-2.jpg" style={{ width: '100%', borderRadius: '4px' }} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8 col-lg-offset-2">
            <div className="f1 lh-title tc mt6 mb5">We help you bring the nature indoors by making it easy to own houseplants. </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div className="flex flex-column items-center">
              <Step>1</Step>
              <div className="tc mt4 ph4">Beautiful (and near indestructible) plants, potted and delivered to your door</div>
              <img src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-2.jpg" className="mv4" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="flex flex-column items-center">
              <Step>2</Step>
              <div className="tc mt4 ph4">Premium quality, locally crafted pot (new collections coming soon!)</div>
              <img src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-1.jpg" className="mv4" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="flex flex-column items-center">
              <Step>3</Step>
              <div className="tc mt4 ph4">On-going, personalized support and expert help to keep your plants alive and well</div>
              <img src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-2.jpg" className="mv4" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

      </div>

      <div className="container-main collection mb4">
        <div className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <div className="f1 lh-title tc mb6">Shop our collection.</div>
          </div>

          {mostPopularPlants.map(({ id, name, caption, images, metadata }) => (
            <div className="col-sm-6 col-md-6 col-lg-4" key={id}>
              <Link
                to={`/products/${metadata.url}`}
                className="collection__card"
              >
                <img
                  src={images[0]}
                  alt="match.params.collection"
                  className="product__image"
                  style={{ width: '100%' }}
                />

                <div className="product__info">
                  <span className="product__name">{name}</span>
                  <span className="product__price">$129</span>
                </div>
                <div className="product__caption">
                  <span className="product__caption--1">{caption}</span>
                  <span className="product__caption--2">(pot + plant)</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </div >
  );
};

export default AboutPage;