import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Payments from '../Payments';
import Header from '../Header';
import CartSummary from './CartSummary';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import CheckoutNav from './CheckoutNav';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';

class CheckoutPage extends Component {
  state = {
    currentProcess: 'shipping'
  };
  render() {
    return (
      <div>
        <Header checkoutHeader={true} />
        <div className="container checkout">
          <div className="row">
            <div className="col-xs-12">
              <CheckoutNav checkoutStep="shipping" />
            </div>
            <div className="col-xs-12 col-lg-4">
              <div className="checkout__forms checkout__shipping-form">
                <ShippingForm />
              </div>
            </div>

            <div className="col-xs-12 col-lg-4">
              <div className="checkout__forms checkout__shipping-form">
                <PaymentForm />
              </div>
            </div>
            <div className="col-xs-12 col-lg-4" />
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutPage;
