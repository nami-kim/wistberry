import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux'
import { handleToken } from '../actions/billingActions'

class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          name="Zee Zee Plant"
          description="$139 for plant and pot"
          amount={15900}
          token={token => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">Pay Button</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default connect(null, { handleToken })(Payments)
