import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { toggleCartOpen } from '../actions/cartActions';
import {OrangeButton} from './utils/Button';

// fetchItemsInCart

class Cart extends Component {
  render() {
    const { products, match, skus, toggleCartOpen } = this.props;

    return (
      <div className="cart-background">
        <div className="container cart-page">
          <div className="cart-page__top" onClick={toggleCartOpen}>
            <Icon
              width="31"
              height="31"
              paths={ICON_PATHS['cross']}
              pathStyle={{
                strokeWidth: '.4',
                fill: 'black',
                stroke: 'black'
              }}
            />
            <div>My Cart</div>
            <Icon
              width="35"
              height="35"
              paths={ICON_PATHS['cart']}
              pathStyle={{
                strokeWidth: '.4',
                fill: 'black',
                stroke: 'black'
              }}
            />
          </div>
          <div className="cart-page__free-shipping">
            Free Shipping on All Orders!
          </div>
          <div className="row cart-page__product-summary">
            <div className="col-xs-5 cart-page__product-image">
              <img
                src="http://wistberry.imgix.net/images/products/two/main.jpg"
                alt="Zee Zee Plant"
                style={{ width: '100%' }}
              />
            </div>
            <div className="col-xs-7 cart-page__product-details">
              <div className="cart-page__plant-name">Zee Zee Plant</div>
              <div className="cart-page__pot-name">
                <span>Pot:</span>
                <span>Ivy Pink</span>
              </div>
              <div className="cart-page__base-name">
                <span>Base:</span>
                <span>Walnut</span>
              </div>
              <div className="cart-page__qty-price-summary row">
                <div className="cart-page__qty-control-bar col-xs-6">
                  <Icon
                    width="16"
                    height="16"
                    paths={ICON_PATHS['minus']}
                    pathStyle={{
                      strokeWidth: '.4',
                      fill: 'black',
                      stroke: 'black'
                    }}
                  />
                  <span>1</span>
                  <Icon
                    width="16"
                    height="16"
                    paths={ICON_PATHS['plus']}
                    pathStyle={{
                      strokeWidth: '.4',
                      fill: 'black',
                      stroke: 'black'
                    }}
                  />
                </div>
                <span className="col-xs-4 cart-page__trash-icon">
                  <Icon
                    width="20"
                    height="20"
                    paths={ICON_PATHS['trash']}
                    pathStyle={{
                      strokeWidth: '.3',
                      fill: 'black'
                      // stroke: 'black'
                    }}
                    style={{ display: 'block' }}
                  />
                </span>

                <span className="cart-page__price col-xs-2">$135</span>
              </div>
            </div>
          </div>
          <div className="cart-page__bottom">
            <div className="col-xs-12 cart-page__subtotal">
              <span className="cart-page__subtotal-name">Subtotal</span>
              <span className="cart-page__subtotal-price">$135 CAD</span>
            </div>
            <div className="col-xs-12 cart-page__subtotal">
              <div className="cart-page__subtotal-name">Shipping</div>
              <div className="cart-page__subtotal-price">Free</div>
            </div>
          </div>
          <Link to="/checkout-option">
            <OrangeButton onClick={toggleCartOpen}>
              Checkout
            </OrangeButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleCartOpen }
)(Cart);
