import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';
// import CheckoutNav from './CheckoutNav';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import CheckoutReview from './CheckoutReview';
import ShippingSummary from './ShippingSummary';
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
    this.toggleShippingFormOpen()
  };

  render() {
    let shippingFormDisplay;

    const { isAuthenticated, checkout } = this.props;
    const { shippingAddressOptions } = checkout;
    if (this.state.shippingFormOpen) {
      if (isAuthenticated) {
        shippingFormDisplay = (
          <div className="checkout__login-view">
            <div className="checkout__customer-address">
              <form>
                {shippingAddressOptions.map((address, i) => {
                  const {
                    firstname,
                    lastname,
                    address2,
                    address1,
                    city,
                    postalCode,
                    province,
                    country,
                    phone
                  } = address;

                  return (
                    <div key={i} className="checkout__address-options">
                      <input
                        className="checkout__address-options-radio-check"
                        type="radio"
                        value={i}
                        checked={this.state.radioChecked === i}
                        onChange={this.handleChange}
                      />
                      <div className="">
                        <div className="checkout__address-options-name">{`${firstname} ${lastname}`}</div>
                        <div>{`${address2}, ${address1}`}</div>
                        <div>{`${city}, ${province} ${postalCode}`}</div>
                        <div>{phone}</div>
                        <div>{country}</div>
                      </div>
                    </div>
                  );
                })}
              </form>
            </div>
            <div
              className="checkout__add-new-address"
              onClick={this.toggleAddNewAddress}
            >
              + Add a new address
            </div>
            <div className="checkout__new-address-form">
              <AddressForm
                forExistingUser={isAuthenticated}
                addNewAddress={this.state.addNewAddress}
                toggleShippingFormOpen={this.toggleShippingFormOpen}
                toggleAddNewAddress={this.toggleAddNewAddress}
              />
            </div>
          </div>
        );
      } else {
        shippingFormDisplay = (
          <div>
            <AddressForm
              forExistingUser={false}
              toggleShippingFormOpen={this.toggleShippingFormOpen}
              toggleAddNewAddress={this.toggleAddNewAddress}
            />
          </div>
        );
      }
    } else {
      shippingFormDisplay = <ShippingSummary />;
    }

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
                    {shippingFormDisplay}
                    {!this.state.shippingFormOpen && (
                      <EditButton onClick={this.handleEditShipping}>
                        Edit
                      </EditButton>
                    )}
                  </div>
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
                  >
                    <PaymentForm
                      togglePaymentFormOpen={this.togglePaymentFormOpen}
                    />
                  </div>
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
                  >
                    <CheckoutReview
                      toggleOrderSummaryFormOpen={
                        this.toggleOrderSummaryFormOpen
                      }
                    />
                  </div>
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

// <div className="col-xs-12">
//   <CheckoutNav checkoutStep="shipping" />
// </div>
