import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';

class ShopCategory extends Component {
  render() {
    const productCategoryImage = {
      allPlants: 'http://wistberry.imgix.net/images/products/one/main.jpg',
      safeForPets: 'http://wistberry.imgix.net/images/products/two/main.jpg',
      mostPopular: 'http://wistberry.imgix.net/images/products/three/main.jpg',
      easyCare: 'http://wistberry.imgix.net/images/products/four/main.jpg'
    };

    return (
      <div className="shop-category">
        <div className="container-wide">
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <Link to="/collection/most-popular-plants">
                <div className="shop-category__collection">
                  <img
                    src={productCategoryImage.mostPopular}
                    alt="Most Popular"
                    style={{ width: '100%', objectFit: 'contain' }}
                  />
                  <div className="shop-category__title">Most Popular</div>
                </div>
              </Link>
            </div>
            <div className="col-xs-6 col-md-3">
              <Link to="/collection/easy-care-plants">
                <div className="shop-category__collection">
                  <img
                    src={productCategoryImage.easyCare}
                    alt="Easy Care"
                    style={{ width: '100%' }}
                  />
                  <div className="shop-category__title">Easy Care</div>
                </div>
              </Link>
            </div>
            <div className="col-xs-6 col-md-3">
              <Link to="/collection/pet-safe-plants">
                <div className="shop-category__collection">
                  <img
                    src={productCategoryImage.safeForPets}
                    alt="Safe for Pets"
                    style={{ width: '100%' }}
                  />
                  <div className="shop-category__title">Safe for Pets</div>
                </div>
              </Link>
            </div>

            <div className="col-xs-6 col-md-3">
              <Link to="/collection/all-plants">
                <div className="shop-category__collection">
                  <img
                    src={productCategoryImage.allPlants}
                    alt="Shop All Plants"
                    style={{ width: '100%' }}
                  />
                  <div className="shop-category__title">Shop All</div>
                </div>
              </Link>
            </div>
            <div className="col-xs-12">
              <div
                className="shop-category__icon"
                onClick={this.props.toggleShopCategory}
              >
                <Icon
                  width="30"
                  height="30"
                  style={{ display: 'block' }}
                  paths={ICON_PATHS['chevron-up']}
                  pathStyle={{ strokeWidth: '2' }}
                  // pathClassName="header__icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCategory;
