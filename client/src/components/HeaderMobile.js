import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';

export class HeaderMobile extends Component {
  state = {
    isReducedHeader: false,
    mobileMenuOpen: false
  };

  toggleBurgerMenu = () => {
    const { mobileMenuOpen } = this.state;
    this.setState(() => ({ mobileMenuOpen: !mobileMenuOpen }));
  };

  // Reduce header size and color on scroll
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
    const { defaultHeader = false } = this.props;
    const classReducedHeader =
      this.state.isReducedHeader || defaultHeader || this.state.mobileMenuOpen
        ? 'reducedHeaderOnScroll'
        : '';

    const headerLogo =
      this.state.isReducedHeader || defaultHeader || this.state.mobileMenuOpen
        ? 'http://wistberry.imgix.net/images/logo/logo_4.svg'
        : 'http://wistberry.imgix.net/images/logo/logo_4_white.svg';

    const BurgerMenu = ({ ...rest }) => (
      <div {...rest}>
        {this.state.mobileMenuOpen ? (
          <span>
            <Icon
              width="24"
              height="24"
              paths={ICON_PATHS['cross']}
              pathStyle={{ strokeWidth: '0' }}
              style={{
                verticalAlign: 'middle',
                paddingLeft: '4px',
                paddingTop: '2px'
              }}
              pathClassName="header__icon"
            />
          </span>
        ) : (
          <span>
            <Icon
              width="31"
              height="31"
              paths={ICON_PATHS['menu']}
              pathStyle={{ strokeWidth: '0' }}
              style={{
                verticalAlign: 'middle',
                paddingLeft: '4px',
                paddingTop: '2px'
              }}
              pathClassName="header__icon"
            />
          </span>
        )}
      </div>
    );

    return (
      <div className="show-header-mobile container">
        <div className={`row header ${classReducedHeader}`}>
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
                  width="33"
                  height="33"
                  paths={ICON_PATHS['cart']}
                  pathStyle={{ strokeWidth: '0' }}
                  style={{
                    paddingLeft: '4px',
                    verticalAlign: 'middle',
                    margin: '-12px 0px'
                  }}
                  pathClassName="header__icon"
                />
              </span>
            </Link>
          </div>
        </div>
        {this.state.mobileMenuOpen && (
          <div className="header-dropdown__menu">
            <div className="flex flex-column">
              <div className="header-dropdown__menu-items">
                <div className="header-dropdown__menu-items--main">
                  <div className="">
                    <Link to="/collection/all-plants" className="shop">
                      Shop
                      <span>
                        <Icon
                          width="14"
                          height="14"
                          paths={ICON_PATHS['chevron-down']}
                          pathStyle={{ strokeWidth: '3' }}
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
                </div>
                <div className="header-dropdown__menu-items--secondary">
                  <Link to="/account/signup">Sign up</Link>
                  <Link to="/cart">Cart</Link>
                  <Link to="/contact">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HeaderMobile;
