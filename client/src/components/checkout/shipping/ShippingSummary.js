import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ShippingSummary extends Component {
  formatPhoneNumber = phoneNumberString => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  };
  render() {
    const { selectedShippingAddress, email } = this.props.checkout;
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
      <div className={`shipping-form ${this.props.show ? '' : 'no-display'}`}>
        {!_.isEmpty(email) && (
          <div className="checkout__customer-email">
            <div className="checkout__customer-email-title">Email</div>
            <div>{email}</div>
          </div>
        )}
        {!_.isEmpty(selectedShippingAddress) && (
          <div className="checkout__customer-address">
            <div className="checkout__customer-address-title">Shipping Address</div>
            <div className="checkout__address-options-name">{`${firstname} ${lastname}`}</div>
            <div>{`${address2}, ${address1}`}</div>
            <div>{`${city}, ${province} ${postalCode}`}</div>
            <div>{this.formatPhoneNumber(phone)}</div>
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
