import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__left">
          <Link to="/collection/all-plants" className="shop">
            Shop
          </Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="header__middle">
          <Link to="/" className="name">
            <img
              src="http://wistberry.imgix.net/images/logo.svg"
              className="logo"
            />
          </Link>
        </div>
        <div className="header__right">
          <Link to="/account/login" className="login">
            Login
          </Link>
          <a className="country" href="#">
            CAN
          </a>
          <Link to="/cart" className="cart">
            Cart
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
