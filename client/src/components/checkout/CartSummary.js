import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { toggleCartOpen } from '../../actions/cartActions';
import Button from '../utils/Button';

// fetchItemsInCart

class CartSummary extends Component {
  render() {
    const { products, match, skus, toggleCartOpen } = this.props;

    return (
      <div className="cart-summary container">
        <div className="row cart-summary__product-summary">
          <div className="col-xs-4 cart-page__product-image">
            <img
              src="http://wistberry.imgix.net/images/products/two/main.jpg"
              alt="Zee Zee Plant"
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-xs-6 cart-summary__product-details">
            <div className="cart-page__plant-name">Zee Zee Plant</div>
            <div className="cart-page__pot-name">
              <span>Pot:</span>
              <span>Ivy Pink</span>
            </div>
            <div className="cart-page__base-name">
              <span>Base:</span>
              <span>Walnut</span>
            </div>
            <div className="cart-page__qty">
              <span>Qty:</span>
              <span>1</span>
            </div>
          </div>
          <div className="col-xs-2">
            <div className="cart-page__qty">$135</div>
          </div>
        </div>
        <div className="cart-summary__bottom">
          <div className="col-xs-12 cart-summary__subtotal">
            <span className="cart-summary__subtotal-name">Subtotal</span>
            <span className="cart-summary__subtotal-price">$135</span>
          </div>
          <div className="col-xs-12 cart-summary__subtotal">
            <div className="cart-summary__subtotal-name">Shipping</div>
            <div className="cart-summary__subtotal-price">Free</div>
          </div>
          <div className="col-xs-12 cart-summary__subtotal">
            <div className="cart-summary__subtotal-name">Tax</div>
            <div className="cart-summary__subtotal-price">$0</div>
          </div>
          <div className="col-xs-12 cart-summary__subtotal">
            <div className="cart-summary__subtotal-name">Total</div>
            <div className="cart-summary__subtotal-price">$135 CAD</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleCartOpen }
)(CartSummary);
