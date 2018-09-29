import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';

export class Header extends Component {
  state = {
    isReducedHeader: false
  };

  reduceHeader = () => {
    const { isReducedHeader } = this.state;

    window.scrollY > 10
      ? !isReducedHeader && this.setState({ isReducedHeader: true })
      : isReducedHeader && this.setState({ isReducedHeader: false });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.reduceHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.reduceHeader);
  }
  // <Header defaultReduced={true}
  render() {
    const { defaultHeader = false } = this.props;
    const classReducedHeader =
      this.state.isReducedHeader || defaultHeader
        ? 'reducedHeaderOnScroll'
        : '';

    const headerLogo =
      this.state.isReducedHeader || defaultHeader
        ? 'http://wistberry.imgix.net/images/logo/logo_4.svg'
        : 'http://wistberry.imgix.net/images/logo/logo_4_white.svg';

    // <Icon
    //   icon="chevron-down"
    //   width="13"
    //   height="13"
    //   style={{ marginLeft: '2px' }}
    // />

    return (
      <div className={`header ${classReducedHeader}`}>
        <div className="header__left">
          <Link to="/collection/all-plants" className="shop">
            Shop
            <span>
              <img src="../SVG/chevron-down.svg" />
            </span>
          </Link>

          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/quiz">Quiz</Link>
        </div>
        <div className="header__middle">
          <Link to="/" className="name">
            <img
              src={headerLogo}
              className="header-logo"
              alt="wistberry logo"
            />
          </Link>
        </div>
        <div className="header__right">
          <Link to="/account/signup" className="signup">
            Sign up
          </Link>
          <a className="country" href="#">
            CAN
          </a>
          <Link to="/cart" className="cart">
            CART
            <span>
              <Icon
                icon="cart1"
                width="17"
                height="17"
                style={{
                  fontWeight: '500',
                  marginLeft: '2px',
                  verticalAlign: 'middle'
                }}
              />
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
