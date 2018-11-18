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
import { setSelectedShippingAddress } from '../../actions/checkoutActions';

class CheckoutPage extends Component {
  state = {
    shippingFormOpen: true,
    paymentFormOpen: false,
    orderSummaryFormOpen: false,
    addNewAddress: false,
    radioChecked: 0
  };
  toggleShippingFormOpen = () => {
    this.setState(() => ({
      shippingFormOpen: !this.state.shippingFormOpen,
      paymentFormOpen: !this.state.paymentFormOpen
    }));
  };
  togglePaymentFormOpen = () => {
    this.setState(() => ({
      paymentFormOpen: !this.state.paymentFormOpen,
      orderSummaryFormOpen: !this.state.orderSummaryFormOpen
    }));
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
  handleEditShipping = e => {
    this.toggleShippingFormOpen();
  };

  render() {
    console.log(this.state.shippingFormOpen)
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
                  <div
                    className={`${
                      this.state.shippingFormOpen ? '' : 'inactive'
                    }`}
                  >
                    <div className={`checkout__edit-btn ${!this.state.shippingFormOpen ? '': 'no-display'}`}>
                      <EditButton
                        show={!this.state.shippingFormOpen}
                        onClick={this.handleEditShipping}
                      >
                        Edit
                      </EditButton>
                    </div>
                  </div>
                  <ShippingForm
                    toggleShippingFormOpen={this.toggleShippingFormOpen}
                    show={this.state.shippingFormOpen}
                  />
                  <ShippingSummary show={!this.state.shippingFormOpen} />
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__payment-container">
                <div className="checkout__title">
                  <span className="text-red">02</span> Payment
                </div>
                <div className="checkout__payment-inner-container">
                  <div
                    className={`${
                      this.state.paymentFormOpen ? '' : 'inactive'
                    }`}
                  />
                  <PaymentForm
                    togglePaymentFormOpen={this.togglePaymentFormOpen}
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-4 no-gutter">
              <div className="checkout__forms checkout__order-summary-container">
                <div className="checkout__title">
                  <span className="text-red">03</span> Order Summary
                </div>
                <div className="checkout__order-summary-inner-container">
                  <div
                    className={`${
                      this.state.orderSummaryFormOpen ? '' : 'inactive'
                    }`}
                  />
                  <CheckoutReview
                    toggleOrderSummaryFormOpen={this.toggleOrderSummaryFormOpen}
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
  { setSelectedShippingAddress }
)(CheckoutPage);


