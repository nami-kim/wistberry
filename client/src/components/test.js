import React, { Component } from 'react';
import { connect } from 'react-redux';

class test extends Component {
  render() {
    const {
      shippingAddress,
      newsletter,
      email,
      paymentInfo
    } = this.props.checkout;
    const {
      firstname = '',
      lastname ='',
      address2 ='',
      address1 ='',
      city ='',
      postalCode ='',
      province ='',
      phone ='',
      country =''
    } = shippingAddress[0];
    return (
      <div>
        {firstname} {lastname}
        {address2}, {address1}
        {city}, {province}, {postalCode}
        {phone}
        {country}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout,
  isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStateToProps)(test);
