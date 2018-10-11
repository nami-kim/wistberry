import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { connect } from 'react-redux';

export class HeaderMobile extends Component {
  state = {
    isReducedHeader: false,
    mobileMenuOpen: false
  };

  toggleBurgerMenu = () => {
    const { mobileMenuOpen } = this.state;
    this.setState(() => ({ mobileMenuOpen: !mobileMenuOpen }));
  };

  // Reduce header size and styling on scroll
  reduceHeader = () => {
    const { isReducedHeader } = this.state;

    window.scrollY > 10
      ? !isReducedHeader && this.setState(() => ({ isReducedHeader: true }))
      : isReducedHeader && this.setState(() => ({ isReducedHeader: false }));
  };

  componentDidMount() {
    window.addEventListener('scroll', this.reduceHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.reduceHeader);
  }

  render() {
    const { defaultHeader, productHeader } = this.props;
    const { isAuthenticated } = this.props.auth;
    const classProductHeader = productHeader ? 'productHeader' : '';
    const classReducedHeader =
      this.state.isReducedHeader || defaultHeader || this.state.mobileMenuOpen
        ? 'reducedHeaderOnScroll'
        : '';

    const headerLogo =
      this.state.isReducedHeader ||
      defaultHeader ||
      this.state.mobileMenuOpen ||
      productHeader
        ? 'http://wistberry.imgix.net/images/logo/logo_4.svg'
        : 'http://wistberry.imgix.net/images/logo/logo_4_white.svg';

    // Burger Menu on mobile and sm screen
    const BurgerMenu = ({ ...rest }) => (
      <div {...rest}>
        {this.state.mobileMenuOpen ? (
          <span>
            <Icon
              width="20"
              height="20"
              paths={ICON_PATHS['cross']}
              pathStyle={{
                strokeWidth: '0',
                fill: 'black',
                stroke: 'black'
              }}
              style={{
                margin: '20px'
              }}
              pathClassName="header__icon"
            />
          </span>
        ) : (
          <span>
            <Icon
              width="26"
              height="26"
              paths={ICON_PATHS['menu']}
              pathStyle={{ strokeWidth: '0' }}
              style={{
                verticalAlign: 'middle',
                margin: '10px'
              }}
              pathClassName="header__icon"
            />
          </span>
        )}
      </div>
    );

    return (
      <div className="show-header-mobile container">
        <div
          className={`row header ${classProductHeader} ${classReducedHeader}`}
        >
          <div className="col-xs-4 header--section__left">
            <BurgerMenu
              onClick={this.toggleBurgerMenu}
              className="header__burger-menu"
            />
          </div>
          <div className="col-xs-4 header__section--middle">
            <Link to="/" className="logo">
              <img
                src={headerLogo}
                className="header__logo"
                alt="wistberry logo"
              />
            </Link>
          </div>
          <div className="col-xs-4 header__section--right">
            <Link to="/cart" className="cart">
              <span>
                <Icon
                  width="30"
                  height="30"
                  paths={ICON_PATHS['cart']}
                  pathStyle={{ strokeWidth: '0' }}
                  style={{
                    verticalAlign: 'middle'
                  }}
                  pathClassName="header__icon"
                />
              </span>
            </Link>
          </div>
        </div>

        {this.state.mobileMenuOpen && (
          <div className="show-header-mobile container">
            <div
              className="header__slidebar-box"
              style={{
                backgroundImage:
                  "url('http://wistberry.imgix.net/images/products/ideas/plant-closeup5.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'left center',
                overflow: 'hidden',
                height: '100vh'
              }}
            >
              <div className="header__slidebar">
                <div className="header__slidebar-items">
                 
                    <div>
                      <Link to="/collection/all-plants">
                        Shop
                        <span>
                          <Icon
                            width="14"
                            height="14"
                            paths={ICON_PATHS['chevron-down']}
                            pathStyle={{ strokeWidth: '2' }}
                            style={{
                              paddingLeft: '4px',
                              paddingTop: '2px'
                            }}
                          />
                        </span>
                      </Link>
                    </div>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/quiz">Quiz</Link>
                    {!isAuthenticated && (
                      <Link to="/account/signup">Sign up</Link>
                    )}
                    {!isAuthenticated && (
                      <Link to="/account/login">Log in</Link>
                    )}
                    {isAuthenticated && <Link to="/account">Account</Link>}
                    <Link to="/contact">Contact</Link>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HeaderMobile);

// <div className="col-xs-7">
//   <div
//     className="header__dropdown-menu-items--image"
//     style={{
//       backgroundImage:
//         "url('http://wistberry.imgix.net/images/products/ideas/plant-closeup5.jpg')",
//       backgroundSize: 'cover',
//       height: '100vh',
//     }}
//   />
// </div>
