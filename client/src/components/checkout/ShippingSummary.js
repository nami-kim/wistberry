import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ShippingSummary extends Component {
  render() {
    const {
      selectedShippingAddress,
      newsletter,
      email,
      paymentInfo
    } = this.props.checkout;
    const {
      firstname,
      lastname,
      address2,
      address1,
      city,
      postalCode,
      province,
      phone,
      country
    } = selectedShippingAddress;
    return (
      <div className="shipping-form">
        {!_.isEmpty(selectedShippingAddress) && (
          <div className="checkout__customer-address">
            <div className="checkout__address-options-name">{`${firstname} ${lastname}`}</div>
            <div>{`${address2}, ${address1}`}</div>
            <div>{`${city}, ${province} ${postalCode}`}</div>
            <div>{phone}</div>
            <div>{country}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout,
  isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStateToProps)(ShippingSummary);
