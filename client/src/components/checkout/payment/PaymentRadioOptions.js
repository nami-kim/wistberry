import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setSelectedBilling } from '../../../actions/checkoutActions';

class PaymentRadioOptions extends Component {
  handleChange = e => {
    const id = e.target.value;
    const selectedBilling = this.props.checkout.billingOptions.find(
      billing => billing._id === id
    );
    this.props.setSelectedBilling(selectedBilling);
  };
  render() {
    const { billingOptions, selectedBilling, token } = this.props.checkout;
    console.log(billingOptions);
    return (
      <div
        className={`checkout__customer-address ${
          this.props.show ? '' : 'no-display'
        }`}
      >
        <form>
          {_.isEmpty(billingOptions) && _.isEmpty(token) && <p>You haven't added a payment yet.</p>}

          {billingOptions.map(billing => {
            const {
              _id,
              exp_month,
              exp_year,
              last4,
              brand,
              defaultBilling
            } = billing;

            return (
              <div key={_id} className="checkout__address-options">
                <div className="checkout_address-options-radio-wrapper">
                  <input
                    className="checkout__address-options-radio-check"
                    type="radio"
                    value={_id}
                    checked={_id === selectedBilling._id}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="checkout__address-options-summary">
                  <div className="checkout__address-options-name">
                    {`${brand} ending ${last4} ${exp_month} ${exp_year}`}{' '}
                    {defaultBilling && <span>(Default)</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout
});

export default connect(
  mapStateToProps,
  { setSelectedBilling }
)(PaymentRadioOptions);
