import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { connect } from 'react-redux';
import { toggleCartOpen } from '../actions/cartActions';

export class HeaderNonMobile extends Component {
  state = {
    isReducedHeader: false,
    hover: false
  };

  // headerLinkIsClicked = () =>
  //   this.setState(() => !this.state.headerLinkIsClicked);

  reduceHeader = () => {
    const { isReducedHeader } = this.state;

    window.scrollY > 10
      ? !isReducedHeader && this.setState(() => ({ isReducedHeader: true }))
      : isReducedHeader && this.setState(() => ({ isReducedHeader: false }));
  };

  toggleCartOpen = e => {
    e.preventDefault();
    this.props.toggleCartOpen();
  };

  componentDidMount() {
    window.addEventListener('scroll', this.reduceHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.reduceHeader);
  }

  render() {
    const { defaultHeader, productHeader, checkoutHeader } = this.props;
    const { isAuthenticated } = this.props.auth;

    const classProductHeader = productHeader ? 'productHeader' : '';
    const classReducedHeader =
      this.state.isReducedHeader || defaultHeader || checkoutHeader
        ? 'reducedHeaderOnScroll'
        : '';

    const headerLogo =
      this.state.isReducedHeader ||
      defaultHeader ||
      this.state.hover ||
      productHeader ||
      checkoutHeader
        ? 'http://wistberry.imgix.net/images/logo/logo_4.svg'
        : 'http://wistberry.imgix.net/images/logo/logo_4_white.svg';

    return (
      <div className="show-header-non-mobile container">
        <div
          className={`row header ${classProductHeader} ${classReducedHeader}`}
          onMouseOver={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <div className="col-xs-5 header__section--left">
            <Link to="/collection/all-plants" className="shop">
              Shop
              <span>
                <Icon
                  width="14"
                  height="14"
                  paths={ICON_PATHS['chevron-down']}
                  pathStyle={{ strokeWidth: '2' }}
                  style={{
                    verticalAlign: '',
                    paddingLeft: '4px',
                    paddingTop: '2px'
                  }}
                  pathClassName="header__icon"
                />
              </span>
            </Link>
            <div className={`${checkoutHeader && 'no-display'}`}>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/quiz">Quiz</Link>
            </div>
          </div>
          <div className="col-xs-2 header__section--middle">
            <Link to="/" className="logo">
              <img
                src={headerLogo}
                className="header__logo"
                alt="wistberry logo"
              />
            </Link>
          </div>
          <div className="col-xs-5 header__section--right">
            <div className={`${checkoutHeader && 'no-display'}`}>
              {!isAuthenticated && (
                <div style={{ display: 'flex' }}>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Log in</Link>
                </div>
              )}
              {isAuthenticated && (
                <div style={{ display: 'flex' }}>
                  <Link to="/me/account">Account</Link>
                </div>
              )}
            </div>

            <a href="" onClick={this.toggleCartOpen} className="cart">
              CART
              <span>
                <Icon
                  width="35"
                  height="35"
                  paths={ICON_PATHS['cart']}
                  pathStyle={{ strokeWidth: '.4' }}
                  style={{
                    verticalAlign: 'top',
                    margin: '-12px 0px'
                  }}
                  pathClassName="header__icon"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { toggleCartOpen }
)(HeaderNonMobile);

// <a className="country" href="#">
//   <img
//     alt="country icon"
//     src='http://wistberry.imgix.net/images/flags/canada.png'
//     style={{ width: '3rem', height: '1.9rem', paddingTop: '3px' }}
//     className="header__icon--country"

//   />
// </a>
// <span>
//   <Icon
//     width="14"
//     height="14"
//     paths={ICON_PATHS['chevron-down']}
//     pathStyle={{ strokeWidth: '2' }}
//     style={{
//       verticalAlign: 'top',
//       paddingLeft: '4px',
//       paddingTop: '2px'
//     }}
//     pathClassName="header__icon"
//   />
// </span>
