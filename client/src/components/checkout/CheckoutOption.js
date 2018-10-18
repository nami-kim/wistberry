import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Payments from '../Payments';
import Header from '../Header';
import LoginForm from '../auth/LoginForm';
import Button from '../utils/Button';
import CartSummary from './CartSummary';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import CheckoutNav from './CheckoutNav';

class CheckoutOption extends Component {
  state = {
    orderSummaryOpen: false
  };
  render() {
    return (
      <div>
        <Header checkoutHeader={true} />
        <div className="container checkout">
          <div className="row">
            <div className="col-xs-12 col-md-12 ">
              <CheckoutNav />
            </div>
          </div>
          <div className="container-wide checkout__body">
            <div className="row">
              <div className="col-xs-12 col-md-12 checkout__comment">
                <p>Almost there!</p>
              </div>
              <div className="col-xs-12 col-md-12">
                <div className="row checkout__option">
                  <div className="col-xs-12 col-md-6 last-xs first-md checkout__log-in--outer">
                    <div className="checkout__log-in">
                      <LoginForm title="Login to your account" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6 first-xs last-md checkout__guest-checkout--outer">
                    <div className="checkout__guest-checkout">
                      <div className="checkout__guest-checkout--title">
                        Checkout as a guest
                      </div>
                      <p className="checkout__guest-checkout--comment">
                        Not ready to commit? No worries - You can create an
                        account anytime later.
                      </p>
                      <Link
                        to="/checkout"
                        className="checkout__guest-checkout--btn"
                      >
                        <Button>Continue as a guest</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutOption;
