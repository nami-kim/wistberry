import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { SmallButton } from './utils/Button';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';

const AboutPage = () => {
  const Benefit = ({ step, imgSrc, title, children, ...rest }) => (
    <div className="row middle-md mv2" {...rest}>
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
          <img src={imgSrc} style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );

  const benefits = [
    {
      step: 1,
      imgSrc:
        'https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-6.png',
      title: 'Plant + Pot + Delivery',
      text:
        'Beautiful (and near indestructible) plants, potted and delivered to your door.'
    },
    {
      step: 2,
      imgSrc:
        'https://s3-us-west-2.amazonaws.com/wistberry/images/test/pot-2.png',
      title: 'Premium Pots',
      text:
        'Premium quality, locally crafted pots. New collections are coming soon!'
    },
    {
      step: 3,
      imgSrc:
        'https://s3-us-west-2.amazonaws.com/wistberry/images/test/plant-8.png',
      title: 'Expert Help, Forever',
      text:
        'On-going, personalized support and expert help to keep your plants alive and well.'
    }
  ];

  return (
    <div className="f3">
      <Header productHeader={true} />

      {/* hero: #e97373 */}
      <div className="container-wide mt7">
        <div className="row middle-md">
          <div className="col-xs-12 col-md-6">
            <div className="pb5 ph2">
              <div className="f-headline lh-solid fw5">
                <div>Keep in touch with nature.</div>
                <div className="mt4">Even at home.</div>
              </div>
              <div className="mt4 mid-gray">
                Plants do more than making your space look pretty - it makes it
                more livable. Breathe in cleaner air, breathe out stress, and
                live healthier immersed in nature.
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div>
              <img
                src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/interior-design-15.jpg"
                style={{
                  width: '100%',
                  boxShadow: '0 .2rem .5rem 0 rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end: hero */}

      <div className="container-wide mt6 mt7-ns">
        <div className="row middle-sm">
          <div className="col-xs-12 col-sm-7 col-lg-7">
            <div className="pb5 ph3">
              <div className="f1 lh-title fw4">Our story</div>
              <div className="mt4 mid-gray">
                <div>
                  One of our greatest joys in life is walking our dogs in
                  Stanley Park everyday. Every time we’re in the midst of the
                  trees and the plants, we forget about everything else.
                </div>
                <div className="mt3">
                  Then we wondered: why should this be for only an hour a day?
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-5 col-lg-5 first-sm">
          <div className="pa4 pa1-m pa5-l">
              <div
                className="aspect-ratio aspect-ratio--1x1 overflow-hidden"
                style={{
                  borderRadius: '100%',
                  boxShadow: '0 .2rem .5rem 0 rgba(0,0,0,0.2)',
                  zIndex: '0'
                }}
              >
                <div
                  className="aspect-ratio--object"
                  style={{
                    background:
                      'url("https://s3-us-west-2.amazonaws.com/wistberry/images/test/forest-2.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }}
                />
          </div>
            
            </div>
          </div>
        </div>
      </div>

      <div className="container-narrow mt6">
        <div className="row">
          <div className="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
            <div className="f1 lh-title fw4 tc pa4">
              We help you bring the nature indoors by making it easy to own
              houseplants.{' '}
            </div>
          </div>
          <div className="col-xs-12">
            {benefits.map(({ step, imgSrc, title, text }, i) => (
              <Benefit step={step} imgSrc={imgSrc} title={title} key={step}>
                {text}
              </Benefit>
            ))}
          </div>
        </div>
      </div>

      <div className="container-narrow mv6">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-8">
            <div className="f1 lh-title fw4 mb4">
              Shop our collection today.
            </div>
            <Link
              to="/collection/all-plants"
            >
            <SmallButton style={{ display: 'inline-block', width: 'auto' }}>
              Shop Now
            </SmallButton>
            </Link>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default AboutPage;
