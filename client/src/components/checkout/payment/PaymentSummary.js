import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class PaymentSummary extends Component {
  render() {
    const { card } = this.props.token || {};
    const { brand, last4, exp_year, exp_month } = card || {};
    const formattedExpYear = ('0' + exp_year).slice(-2);
    const formattedExpMonth = ('0' + exp_month).slice(-2);
    return (
      <div className={`shipping-form ${this.props.show ? '' : 'no-display'}`}>
        {!_.isEmpty(card) && (
          <div className="checkout__customer-address">
            <div className="checkout__customer-address-title">Payment Info</div>
            <div>{`${brand} XXXX - XXXX - XXXX - ${last4} ${formattedExpMonth}/${formattedExpYear}`}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.checkout.token,
  isAuthenticated: !!state.auth.isAuthenticated
});
export default connect(mapStateToProps)(PaymentSummary);
