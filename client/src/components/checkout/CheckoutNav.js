import React, { Component } from 'react';
import OrderSummary from './OrderSummary';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';

class CheckoutShipping extends Component {
  state = {
    orderSummaryOpen: false
  };
  render() {
    const { checkoutStep } = this.props;
    return (
      <div className="checkout-options__nav">
        <div className="row">
          <div className="col-xs-12 col-md-6 checkout-options__process">
            <span>
              <span
                className={`${
                  checkoutStep === 'shipping' ? 'underline-red' : ''
                }`}
              >
                <span className="checkout-options__process--number">01</span>
                <span className="checkout-options__process--name">
                  Shipping
                </span>
              </span>

              <span className="checkout-options__process--arrow-icon">
                <Icon
                  width="15"
                  height="15"
                  paths={ICON_PATHS['chevron-right']}
                  pathStyle={{
                    strokeWidth: '.6',
                    fill: '#777',
                    stroke: '#777'
                  }}
                />
              </span>
            </span>
            <span>
              <span
                className={`${
                  checkoutStep === 'payment' ? 'underline-red' : ''
                }`}
              >
                <span className="checkout-options__process--number">02</span>
                <span className="checkout-options__process--name">Payment</span>
              </span>

              <Icon
                width="15"
                height="15"
                paths={ICON_PATHS['chevron-right']}
                pathStyle={{
                  strokeWidth: '.6',
                  fill: '#777',
                  stroke: '#777'
                }}
              />
            </span>
            <span
              className={`${checkoutStep === 'review' ? 'underline-red' : ''}`}
            >
              <span className="checkout-options__process--number">03</span>
              <span className="checkout-options__process--name">Review</span>
            </span>
          </div>
          <div className="col-xs-12 col-md-6 checkout-options__order-summary">
            <div>
              <div
                className="checkout-options__order-summary--title"
                onClick={() =>
                  this.setState({
                    orderSummaryOpen: !this.state.orderSummaryOpen
                  })
                }
              >
                <div className="checkout-options__order-summary--qty">
                  1 Item
                </div>
                <div className="checkout-options__order-summary--total">
                  Order Total $140.00 CAD
                  <div className="checkout-options__order-summary--icon">
                    <Icon
                      width="15"
                      height="15"
                      paths={
                        this.state.orderSummaryOpen
                          ? ICON_PATHS['chevron-up']
                          : ICON_PATHS['chevron-down']
                      }
                      pathStyle={{
                        strokeWidth: '.7',
                        fill: '#2a73cc',
                        stroke: '#2a73cc'
                      }}
                    />
                  </div>
                </div>
              </div>
              {this.state.orderSummaryOpen && (
                <div className="order-summary__container">
                  <OrderSummary />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutShipping;
