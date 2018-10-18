import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleToken } from '../../actions/billingActions';

const stripe = window.Stripe(process.env.REACT_APP_STRIPE_KEY);

class Payments extends Component {
  getCard = () => {
    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    return elements.create('card', { style: style });
  };
  componentDidMount() {
    const card = this.getCard();

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }
  handleSubmit = e => {
    e.preventDefault();

    const card = this.getCard();
    console.log(card)

    stripe.createToken(card).then(function (result) {
      if (result.error) {
        console.log(result.error.message);
      } else {
        // Send the token to your server.
        console.log(result.token);
      }
    });
  };
  render() {
    return (
      <form action="/charge" method="post" id="payment-form">
        <div class="form-row">
          <label for="card-element">
            Credit or debit card
    </label>
          <div id="card-element">

          </div>


          <div id="card-errors" role="alert"></div>
        </div>

        <button>Submit Payment</button>
      </form>
    );
  }
}

export default connect(
  null,
  { handleToken }
)(Payments);
