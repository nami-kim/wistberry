import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckoutForm from './StripeCheckoutForm';

class PaymentForm extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <div className="example">
          <Elements>
            <StripeCheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default PaymentForm;
