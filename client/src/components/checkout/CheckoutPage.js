import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from '../Header';
// import CheckoutNav from './CheckoutNav';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import CheckoutReview from './CheckoutReview';

class CheckoutPage extends Component {
  state = {
    currentProcess: 'shipping',
   shippingInfo: {}
  };
  addShippingToState = (shippingInfo) => this.setState(() => ({shippingInfo}))
  render() {
    
    return (
      <div>
        <Header checkoutHeader={true} />
        <div className="container checkout">
          <div className="row">
            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__shipping-container">
                <ShippingForm type="checkout" shippingInfo={this.addShippingToState}/>
              </div>
            </div>

            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__payment-container">
                <PaymentForm />
              </div>
            </div>
            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__order-summary-container">
                <CheckoutReview />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shippingInfo: state.checkout.shippingInfo
})

export default connect(mapStateToProps)(CheckoutPage)

// <div className="col-xs-12">
//   <CheckoutNav checkoutStep="shipping" />
// </div>
