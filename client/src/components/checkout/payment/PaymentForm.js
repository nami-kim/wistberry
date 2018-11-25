import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckoutForm from './StripeCheckoutForm';
import PaymentRadioOptions from './PaymentRadioOptions';

class PaymentForm extends Component {
  state = {
    addNewBillingFormOpen: false
  };
  showAddNewBillingForm = () => {
    this.setState(() => ({
      addNewBillingFormOpen: !this.state.addNewBillingFormOpen
    }));
  };

  render() {
    return (
      <div className="checkout__payment-form">
        <PaymentRadioOptions show={!this.state.addNewBillingFormOpen} />
        <div
          className="checkout__add-new-address"
          onClick={this.showAddNewBillingForm}
        >
          + Add a new credit card
        </div>
        <div className="checkout__new-address-form">
          {this.state.addNewBillingFormOpen && (
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
              <div className="example">
                <Elements>
                  <StripeCheckoutForm />
                </Elements>
              </div>
            </StripeProvider>
          )}
        </div>
      </div>
    );
  }
}

export default PaymentForm;
