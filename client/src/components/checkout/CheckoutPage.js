import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';
// import CheckoutNav from './CheckoutNav';
import PaymentForm from './payment/PaymentForm';
import CheckoutReview from './CheckoutReview';
import ShippingSummary from './shipping/ShippingSummary';
import ShippingForm from './shipping/ShippingForm';
import { EditButton } from '../utils/Button';
import {
  setSelectedShippingAddress,
  changeCheckoutView
} from '../../actions/checkoutActions';
import _ from 'lodash'

class CheckoutPage extends Component {
  state = {
    shippingFormOpen: true,
    paymentFormOpen: false,
    orderSummaryFormOpen: false,
    addNewAddress: false,
    radioChecked: 0
  };

  toggleOrderSummaryFormOpen = () => {
    this.setState(() => ({
      orderSummaryFormOpen: !this.state.orderSummaryFormOpen
    }));
  };
  toggleAddNewAddress = () =>
    this.setState(() => ({ addNewAddress: !this.state.addNewAddress }));

  handleChange = e => {
    const index = parseInt(e.target.value);
    const { shippingAddressOptions } = this.props.checkout;
    this.props.setSelectedShippingAddress(shippingAddressOptions[index]);
    this.setState(() => ({ radioChecked: index }));
  };
  handleEditShipping = () => {
    this.props.changeCheckoutView('shippingView');
  };
  handleEditPayment = () => {
    this.props.changeCheckoutView('paymentView');
  };

  render() {
    console.log(this.state.shippingFormOpen);
    const { shippingView, paymentView, summaryView } = this.props.checkout.view;
    return (
      <div>
        <Header checkoutHeader={true} />
        <div className="container checkout">
          <div className="row">
            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__shipping-container">
                <div className="checkout__title">
                  <span className="text-red">01</span> Shipping
                </div>
                <div className="checkout__shipping-inner-container">
                  <div className={`${shippingView ? '' : 'inactive'}`}>
                    <div
                      className={`checkout__edit-btn ${
                        !shippingView ? '' : 'no-display'
                      }`}
                    >
                      <EditButton
                        show={!shippingView}
                        onClick={this.handleEditShipping}
                      >
                        Edit
                      </EditButton>
                    </div>
                  </div>
                  <ShippingForm show={shippingView} />
                  <ShippingSummary show={!shippingView} />
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__payment-container">
                <div className="checkout__title">
                  <span className="text-red">02</span> Payment
                </div>
                <div className="checkout__payment-inner-container">
                  <div className={`${paymentView ? '' : 'inactive'}`}>
                    <div
                      className={`checkout__edit-btn ${
                        !paymentView ? '' : 'no-display'
                      }`}
                    >
                      <EditButton
                        show={!paymentView && !_.isEmpty(this.props.checkout.token)}
                        onClick={this.handleEditPayment}
                      >
                        Edit
                      </EditButton>
                    </div>
                  </div>
                  <PaymentForm />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__order-summary-container">
                <div className="checkout__title">
                  <span className="text-red">03</span> Order Summary
                </div>
                <div className="checkout__order-summary-inner-container">
                  <div className={`${summaryView ? '' : 'inactive'}`} />
                  <CheckoutReview
                  // toggleOrderSummaryFormOpen={this.toggleOrderSummaryFormOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout,
  isAuthenticated: !!state.auth.isAuthenticated,
  user: state.user
});

export default connect(
  mapStateToProps,
  { setSelectedShippingAddress, changeCheckoutView }
)(CheckoutPage);
