import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { SmallButton } from '../utils/Button';
import { handleToken } from '../../actions/checkoutActions';

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

  async submit(ev) {
    this.setState(() => ({ error: '' }));
    this.props.stripe
      .createToken({
        name: 'Name',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        address_country: 'CA'
      })
      .then(({ token }) => {
        this.props.handleToken(token);
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
        <div className="shipping-form__label shipping-form__item">
          <p className="shipping-form__title">
            <span className="text-red">02</span> Payment
          </p>
        </div>
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

export default connect(
  null,
  { handleToken }
)(injectStripe(StripeCheckoutForm));
