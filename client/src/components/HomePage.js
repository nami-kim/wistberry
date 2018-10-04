import React, { Component } from 'react';
import Header from './Header';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <div className="home">
          
            <img
              src="http://wistberry.imgix.net/images/products/toastandhoney/toastandhoney_hero.jpg"
              alt="hero"
              className="home__hero-image"
            />
            <img
              src="http://wistberry.imgix.net/images/products/toastandhoney/main2.jpg"
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
