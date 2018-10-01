import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';

export class HeaderNonMobile extends Component {
  state = {
    isReducedHeader: false,
    hover: false,
  };

  headerLinkIsClicked = () => this.setState(() => !this.state.headerLinkIsClicked)

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
      this.state.isReducedHeader || defaultHeader
        ? 'reducedHeaderOnScroll'
        : '';

    const headerLogo =
      this.state.isReducedHeader || defaultHeader || this.state.hover
        ? 'http://wistberry.imgix.net/images/logo/logo_4.svg'
        : 'http://wistberry.imgix.net/images/logo/logo_4_white.svg';

    return (
      <div className="show-header-non-mobile container">
        <div
          className={`row header ${classReducedHeader}`}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <div className="col-xs-4 header__left">
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
                  pathClassName="header-icon"
                />
              </span>
            </Link>

            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/quiz">Quiz</Link>
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
            <Link to="/account/signup" className="signup">
              Sign up
            </Link>
            <a className="country" href="#">
              CAN
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
                  pathClassName="header-icon"
                />
              </span>
            </a>
            <Link to="/cart" className="cart">
              CART
              <span>
                <Icon
                  width="28"
                  height="28"
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
      </div>
    );
  }
}

export default HeaderNonMobile;
