import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { SmallButton } from '../utils/Button';
import { handleToken } from '../../actions/billingActions';

class StripeCheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
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
        const order = {
          currency: 'cad',
          items: [
            {
              type: 'sku',
              parent: 'sku_Dfd8fekKmrtZTU'
            }
          ],
          shipping: {
            name: 'Jenny Rosen',
            address: {
              line1: 'Unit 808',
              city: 'Vancouver',
              state: 'ON',
              country: 'CA',
              postal_code: 'V6E 0B1'
            }
          },
          email: 'jenny.rosen@example.com'
        };

        handleToken(token, order)
          .then(orderResult => {
            console.log(orderResult);
          })
          .catch(err => console.log(err));
      });
  }

  render() {
    return (
      <div className="shipping-form">
        <div className="shipping-form__label shipping-form__item">
          <p className="shipping-form__title">
            <span className="text-red">02</span> Payment
          </p>
        </div>
        <CardElement />
        <SmallButton onClick={this.submit}>Next</SmallButton>
      </div>
    );
  }
}

export default injectStripe(StripeCheckoutForm);
