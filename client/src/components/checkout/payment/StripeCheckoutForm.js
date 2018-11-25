import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { SmallButton } from '../../utils/Button';
import { handleToken } from '../../../actions/checkoutActions';
import {
  startAddOrEditBilling,
  changeCheckoutView
} from '../../../actions/checkoutActions';

import _ from 'lodash';

class StripeCheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      error: ''
    };
    this.submit = this.submit.bind(this);
  }

  handleChange = e => {
    if (e.error) {
      this.setState(() => ({ error: e.error.message }));
    }
  };
  // handleSubmitForNewUser = (values, { setSubmitting, resetForm }) => {
  //   this.props
  //     .startAddOrEditShippingAddress(values, {
  //       setAsSelectedShippingAddress: true,
  //       editShippingAddress: !_.isEmpty(
  //         this.props.checkout.selectedShippingAddress
  //       )
  //     })
  //     .then(() => {
  //       console.log('handleSumbitForNewUser working');
  //       setSubmitting(false);
  //       resetForm();
  //       this.props.changeCheckoutView('paymentView');
  //     });
  // };
  async submit(ev) {
    this.setState(() => ({ error: '' }));
    
    const {
      firstname,
      lastname,
      address1,
      address2,
      city,
      province,
      postalCode
    } = this.props.selectedShippingAddress;
    this.props.stripe
      .createToken({
        name: `${firstname} ${lastname}`,
        address_line1: address1,
        address_line2: address2,
        address_city: city,
        address_state: province,
        address_zip: postalCode,
        address_country: 'CA'
      })
      .then(({ token }) => {
        this.props.handleToken(token);
        this.props.changeCheckoutView('summaryView');
       
      })
      .catch(err =>
        this.setState(() => ({
          error: 'Something went wrong on our side. Please try again later.'
        }))
      );
  }

  render() {
    return (
      <div className="shipping-form">
        <div className="shipping-form__delivery">
          <span className="shipping-form__sub-title">Delivery</span>
          <input
            name="delivery"
            className="shipping-form__field"
            value="FREE (7-10 business days)"
            readOnly
          />
        </div>
        <div className="shipping-form__sub-title">
          <span>Payment</span>
          <CardElement onChange={this.handleChange} />
        </div>
        {this.state.error && (
          <div className="shipping-form__error">
            <div className="shipping-form__error--item">{this.state.error}</div>
          </div>
        )}

        <div className="shipping-form__comment">
          You can review this order before it's final.
        </div>
        <SmallButton onClick={this.submit}>Next</SmallButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedShippingAddress: state.checkout.selectedShippingAddress,
  checkout: state.checkout
});

export default connect(
  mapStateToProps,
  { handleToken, changeCheckoutView, startAddOrEditBilling }
)(injectStripe(StripeCheckoutForm));
