import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartSummary from './CartSummary';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';

class CheckoutShipping extends Component {
  state = {
    orderSummaryOpen: false
  };
  render() {
    const { checkoutStep } = this.props;
    return (
      <div className="checkout__nav">
        <div className="row">
          <div className="col-xs-12 col-md-6 checkout__process">
            <span>
              <span
                className={`${
                  checkoutStep === 'shipping' ? 'underline-red' : ''
                }`}
              >
                <span className="checkout__process--number">01</span>
                <span className="checkout__process--name">Shipping</span>
              </span>

              <span className="checkout__process--arrow-icon">
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
                <span className="checkout__process--number">02</span>
                <span className="checkout__process--name">Payment</span>
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
              <span className="checkout__process--number">03</span>
              <span className="checkout__process--name">Review</span>
            </span>
          </div>
          <div className="col-xs-12 col-md-6 checkout__order-summary">
            <div>
              <div
                className="checkout__order-summary--title"
                onClick={() =>
                  this.setState({
                    orderSummaryOpen: !this.state.orderSummaryOpen
                  })
                }
              >
                <div className="checkout__order-summary--qty">1 Item</div>
                <div>
                  Total $140.00 CAD
                  <span>
                    <Icon
                      width="15"
                      height="15"
                      paths={ICON_PATHS['chevron-down']}
                      pathStyle={{
                        strokeWidth: '.6',
                        fill: '#777',
                        stroke: '#777'
                      }}
                    />
                  </span>
                </div>
              </div>
              {this.state.orderSummaryOpen && (
                <div className="checkout__order-summary--dropdown">
                  <CartSummary />
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
