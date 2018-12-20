import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toggleCartOpen } from '../../actions/cartActions';
import { SmallButton } from '../utils/Button';
import { submitToken } from '../../actions/checkoutActions';
import OrderSummary from './OrderSummary';

// fetchItemsInCart

class CheckoutReview extends Component {
  submitOrder = () => {
    const { checkout, cartItems } = this.props;
    const { selectedShippingAddress, email, token } = checkout
    const { firstname, lastname, address1, address2, city, postalCode, province, country} = selectedShippingAddress
    console.log(token);

    const order = {
      currency: 'cad',
      items: cartItems,
      shipping: {
        name: `${firstname} ${lastname}`,
        address: {
          line1: {address1},
          line2: {address2},
          city: {city},
          state: {province},
          country: 'CA',
          postal_code: {postalCode}
        }
      },
      email: {email}
    };
    submitToken(token.id, order)
      .then(orderResult => console.log('order has been completed', orderResult))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="shipping-form">
        
        <div className="order-summary__checkout">
          <OrderSummary />
        </div>

        <SmallButton onClick={this.submitOrder}>Complete Order</SmallButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout,
  cartItems: state.cart.cart.items
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
