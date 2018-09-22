import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
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
        WistBerry
      </Link>
    </div>
    <div className="header__right">
      <Link to="/account/login" className="login">
        Login
      </Link>
      <div className="country">
        CAN
        <span>
          <i class="fas fa-angle-down" />
        </span>
      </div>
      <Link to="/cart" className="cart">
        Cart
      </Link>
    </div>
  </div>
);

export default Header;
