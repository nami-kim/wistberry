import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { toggleCartOpen } from '../../actions/cartActions';
import { SmallButton } from '../utils/Button';
import { submitToken } from '../../actions/checkoutActions';
import OrderSummary from './OrderSummary';

// fetchItemsInCart

class CheckoutReview extends Component {
  submit = () => {
    const { token } = this.props;
    console.log(token);

    const order = {
      currency: 'cad',
      items: [
        {
          type: 'sku',
          parent: 'sku_Dfd8fekKmrtZTU'
        }
      ],
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: 'Unit 808',
          city: 'Vancouver',
          state: 'ON',
          country: 'CA',
          postal_code: 'V6E 0B1'
        }
      },
      email: 'jenny.rosen@example.com'
    };
    submitToken(token.id, order)
      .then(orderResult => console.log('order has been completed', orderResult))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="shipping-form">
        <div className="shipping-form__label shipping-form__item">
          <p className="shipping-form__title">
            <span className="text-red">03</span> Order Summary
          </p>
        </div>
        <div className="order-summary container">
          <div className="row order-summary__product-summary">
            <div className="col-xs-4 order-page__product-image">
              <img
                src="http://wistberry.imgix.net/images/products/two/main.jpg"
                alt="Zee Zee Plant"
                style={{ width: '100%' }}
              />
            </div>
            <div className="col-xs-6 order-summary__product-details">
              <div className="order-page__plant-name">Zee Zee Plant</div>
              <div className="order-page__pot-name">
                <span>Pot:</span>
                <span>Ivy Pink</span>
              </div>
              <div className="order-page__base-name">
                <span>Base:</span>
                <span>Walnut</span>
              </div>
              <div className="order-page__qty">
                <span>Qty:</span>
                <span>1</span>
              </div>
            </div>
            <div className="col-xs-2">
              <div className="order-page__qty">$169</div>
            </div>
          </div>
          <div className="order-summary__bottom">
            <div className="col-xs-12 order-summary__subtotal">
              <span className="order-summary__subtotal-name">Subtotal</span>
              <span className="order-summary__subtotal-price">$169</span>
            </div>
            <div className="col-xs-12 order-summary__subtotal">
              <div className="order-summary__subtotal-name">Shipping</div>
              <div className="order-summary__subtotal-price">Free</div>
            </div>
            <div className="col-xs-12 order-summary__subtotal">
              <div className="order-summary__subtotal-name">Tax</div>
              <div className="order-summary__subtotal-price">$0</div>
            </div>
            <div className="col-xs-12 order-summary__subtotal">
              <div className="order-summary__subtotal-name">Total</div>
              <div className="order-summary__total-price">$169 CAD</div>
            </div>
          </div>
        </div>

        <SmallButton onClick={this.submit}>Complete Order</SmallButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.checkout.token
});

export default connect(
  mapStateToProps,
  { toggleCartOpen }
)(CheckoutReview);

// handleToken(token, order)
//   .then(orderResult => {
//     console.log(orderResult);
//   })
//   .catch(err => console.log(err));
