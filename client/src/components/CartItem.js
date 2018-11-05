import React, { Component } from 'react';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { connect } from 'react-redux';
import {
  startRemoveItemFromCart,
  startIncrementQty,
  startDecrementQty
} from '../actions/cartActions';

class CartItem extends Component {
  handleRemoveItem = () => {
    const { startRemoveItemFromCart, groupId } = this.props;
    startRemoveItemFromCart(groupId);
  };
  handleIncrementQty = () => {
    const { startIncrementQty, groupId } = this.props;
    startIncrementQty(groupId);
  };
  handleDecrementQty = () => {
    const { startDecrementQty, groupId } = this.props;
    startDecrementQty(groupId);
  };
  render() {
    const {
      type,
      quantity,
      plantPrice,
      plantName,
      potName,
      baseName,
      imgUrl
    } = this.props;

    return (
      <div>
        <div className="row cart-page__product-summary">
          <div className="col-xs-5 cart-page__product-image">
            <img src={imgUrl} alt={plantName} style={{ width: '100%' }} />
          </div>
          <div className="col-xs-7 cart-page__product-details">
            <div className="cart-page__plant-name">{plantName}</div>
            <div className="cart-page__pot-name">
              <span>{potName}</span>
            </div>
            <div className="cart-page__base-name">
              <span>{baseName}</span>
            </div>
            {type === 'cart' && (
              <div className="cart-page__qty-price-summary row">
                <div className="cart-page__qty-control-bar col-xs-4">
                  <div
                    className="cart-page__minus-icon"
                    onClick={this.handleDecrementQty}
                  >
                    <Icon
                      width="14"
                      height="14"
                      paths={ICON_PATHS['minus']}
                      pathStyle={{
                        strokeWidth: '.4',
                        fill: 'black',
                        stroke: 'black'
                      }}
                    />
                  </div>

                  <span style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                    {quantity}
                  </span>
                  <div
                    className="cart-page__plus-icon"
                    onClick={this.handleIncrementQty}
                  >
                    <Icon
                      width="14"
                      height="14"
                      paths={ICON_PATHS['plus']}
                      pathStyle={{
                        strokeWidth: '.4',
                        fill: 'black',
                        stroke: 'black'
                      }}
                    />
                  </div>
                </div>
                <div
                  className="col-xs-3 cart-page__trash-icon"
                  onClick={this.handleRemoveItem}
                >
                  <Icon
                    width="20"
                    height="20"
                    paths={ICON_PATHS['trash']}
                    pathStyle={{
                      strokeWidth: '.3',
                      fill: 'black'
                      // stroke: 'black'
                    }}
                    style={{ display: 'block' }}
                  />
                </div>
                <span className="cart-page__price col-xs-4">
                  $ {((plantPrice * quantity) / 100).toFixed(0)}
                </span>
              </div>
            )}
            {type === 'orderSummary' && (
              <div className="cart-page__qty-price-summary row">
                <div className="col-xs-6">
                  <span>Qty: </span>
                  <span style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                    {quantity}
                  </span>
                </div>

                <span className="cart-page__price col-xs-6">
                  $ {((plantPrice * quantity) / 100).toFixed(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { startRemoveItemFromCart, startIncrementQty, startDecrementQty }
)(CartItem);
