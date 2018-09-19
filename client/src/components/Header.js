import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <Link to="/collection/all-plants">Shop</Link>
    <Link to="/about">About</Link>
    <Link to="/blog">Blog</Link>
    <Link to="/account/login">Login</Link>
    <Link to="/cart">Cart</Link>
  </div>
);

export default Header;
