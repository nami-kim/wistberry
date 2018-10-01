import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';

export class HeaderMobile extends Component {
  state = {
    isReducedHeader: false,
    hover: false,
    mobileMenuOpen: false,
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
      this.state.isReducedHeader || defaultHeader || this.state.hover || this.state.mobileMenuOpen
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
              pathStyle={{ strokeWidth: '1' }}
              style={{
                verticalAlign: 'middle',
                paddingLeft: '4px',
                paddingTop: '2px'
              }}
              pathClassName="header-icon"
            />
          </span>
        ) : (
          <span>
            <Icon
              width="30"
              height="30"
              paths={ICON_PATHS['menu']}
              pathStyle={{ strokeWidth: '0' }}
              style={{
                verticalAlign: 'middle',
                paddingLeft: '4px',
                paddingTop: '2px'
              }}
              pathClassName="header-icon"
            />
          </span>
        )}
      </div>
    );

    return (
      <div className="show-header-mobile container">
        <div
          className={`row header ${classReducedHeader}`}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <div className="col-xs-4 header__left">
            <BurgerMenu onClick={this.toggleBurgerMenu} />
          </div>
          <div className="col-xs-4 header__middle">
            <Link to="/" className="name">
              <img
                src={headerLogo}
                className="header-logo"
                alt="wistberry logo"
              />
            </Link>
          </div>
          <div className="col-xs-4 header__right">
            <Link to="/cart" className="cart">
              <span>
                <Icon
                  width="32"
                  height="32"
                  paths={ICON_PATHS['cart']}
                  pathStyle={{ strokeWidth: '0' }}
                  style={{
                    paddingLeft: '4px',
                    verticalAlign: 'middle',
                    margin: '-12px 0px'
                  }}
                  pathClassName="header-icon"
                />
              </span>
            </Link>
          </div>
        </div>
        {this.state.mobileMenuOpen && (
          <div className="header-dropdown-mobile">
            <div className="flex flex-column">
              <div className="nav-item-mobile">
                <div className="nav-item-mobile__main">
                  <Link to="/collection/all-plants">Shop</Link>
                  <Link to="/about">About</Link>
                  <Link to="/blog">Blog</Link>
                  <Link to="/quiz">Quiz</Link>
                </div>
                <div className="nav-item-mobile__secondary">
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
