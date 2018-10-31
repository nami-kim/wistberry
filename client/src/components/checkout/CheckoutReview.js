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
        <div className="order-summary__checkout">
          <OrderSummary />
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
