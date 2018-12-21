import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { FooterButton } from './utils/Button';

const Footer = () => {
  const collections = [
    {
      title: 'Most Popular Plants',
      url: '/collection/most-popular-plants'
    },
    {
      title: 'Pet Safe Plants',
      url: '/collection/pet-safe-plants'
    },
    {
      title: 'All Plants',
      url: '/collection/all-plants'
    }
  ];
  const bottomFooter = [
    {
      title: 'Privacy',
      url: '/privacy'
    },
    {
      title: 'Terms',
      url: '/terms'
    },
    {
      title: 'Sitemap',
      url: '/sitemap'
    }
  ];

  const SocialIcon = ({ icon }) => (
    <div
      className="flex items-center justify-center ba br-100 b--grey-main mr3"
      style={{ width: '40px', height: '40px' }}
    >
      <Icon
        width="16"
        height="16"
        className
        paths={ICON_PATHS[icon]}
        pathStyle={{ fill: '#444' }}
        viewBox="0 0 32 32"
      />
    </div>
  );

  const socialIcons = ['facebook', 'instagram', 'youtube', 'linkedin'];

  return (
    <footer className="grey-main pv3 f4">
      {/* top */}
      <div>
        <div className="row">
          {/* email subscription */}
          <div className="col-xs-12 bg-near-black white tc ttu pv5">
            <p className="pv2 f3 fw4 tracked">Join Wistberry.com Community</p>
            <p className="pv1 f4 fw2">
              Be the first to hear about new products, <br />
              exclusive offers, and care tips.
            </p>

            <form className="bg-white center flex justify-between pa2 mt3 f4" style={{ width: '320px' }}>
              <input
                type="email"
                name="email"
                placeholder="Your E-mail"
                className="pa3 fw3 ba b--white"
              />
              <FooterButton>Submit</FooterButton>
            </form>
          </div>
        </div>
        <div className="container-narrow">
          <div className="row pt6 pb5">
            {/* collections */}
            <div className="col-xs-12 col-md-5 col-lg-3 mb4">
              <div className="f3 fw4 mb4">Collections</div>
              {collections.map(({ title, url }, i) => (
                <div className="mb4" key={url}>
                  <Link to={url} className="grey-main link dim">
                    {title}
                  </Link>
                </div>
              ))}
            </div>
            {/* end: collections */}

            {/* about */}
            <div className="col-xs-12 col-md-4 col-lg-2 mb4">
              <div className="f3 fw4 mb4">About</div>
              <div className="mb4">
                <Link to="/about" className="grey-main link dim">
                  Our Story
                </Link>
              </div>
            </div>
            {/* end: about */}

            {/* support */}
            <div className="col-xs-12 col-md-3 col-lg-2 mb4">
              <div className="f3 fw4 mb4">Support</div>
              <div className="mb4">
                <Link to="/FAQPage" className="grey-main link dim">
                  FAQ
                </Link>
              </div>
              <div className="mb4">
                <Link to="/contact" className="grey-main link dim">
                  Contact us
                </Link>
              </div>
            </div>
            {/* end: support */}

            {/* others + social media */}
            <div className="col-xs-12 col-md-12 col-lg-4 col-lg-offset-1 mb4">
              <div className="f3 fw4 mb4">Share the Love</div>
              <div className="flex items-center">
                {socialIcons.map((icon, i) => (
                  <SocialIcon icon={icon} key={icon} />
                ))}
              </div>
            </div>
            {/* end: others + social media */}
          </div>
        </div>
      </div>
      {/* end: top */}

      {/* bottom */}
      <div className="pv3">
        <div className="flex justify-center">
          <div className="ph4 light-silver">© {moment().year()}</div>
          {bottomFooter.map(({ title, url }, i) => (
            <Link to={url} className="light-silver link dim ph4" key={i}>
              {title}
            </Link>
          ))}
        </div>
      </div>
      {/* end: bottom */}
    </footer>
  );
};

export default Footer;
