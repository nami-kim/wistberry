import React, { Component } from 'react';
import Header from './Header';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-hero">
          <div className="home">
            <img
              src="http://wistberry.imgix.net/images/products/hero/plantonpink2.jpg"
              alt="hero"
              className="home__hero-image"
            />
            <img
              src="http://wistberry.imgix.net/images/products/toastandhoney/toastandhoney_hero.jpg"
              alt="hero"
              className="home__hero-image"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
