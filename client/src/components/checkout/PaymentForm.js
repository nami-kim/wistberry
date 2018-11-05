import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckoutForm from './StripeCheckoutForm';
import { withFormik, Form, Field } from 'formik';

class PaymentForm extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <div className="example">
          <Elements>
            <StripeCheckoutForm togglePaymentOpen={this.props.togglePaymentOpen}/>
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default PaymentForm;
