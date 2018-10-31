import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CartItem from '../CartItem';

// fetchItemsInCart

class CartSummary extends Component {
  render() {
    const { products, match, skus, cart, type } = this.props;
    const cartItems = cart.map(cartItem => (
      <CartItem
        type="orderSummary"
        key={cartItem.group.id}
        quantity={cartItem.group.quantity}
        groupId={cartItem.group.id}
        imgUrl={cartItem.group.plantImage}
        plantPrice={cartItem.group.plantPrice}
        plantName={cartItem.group.plantName}
        potName={cartItem.group.potName}
        baseName={cartItem.group.baseName}
      />
    ));
    const cartTotal = (
      cart.reduce(
        (prev, { group }) => prev + group.plantPrice * group.quantity,
        0
      ) / 100
    ).toFixed(0);

    return (
      <div className="container">
        <div className="order-summary__title">Order Summary</div>
        {cartItems}
        <div className="order-summary__bottom">
          <div className="col-xs-12 order-summary__subtotal">
            <span className="order-summary__subtotal-name">Subtotal</span>
            <span className="order-summary__subtotal-price">${cartTotal}</span>
          </div>
          <div className="col-xs-12 order-summary__subtotal">
            <div className="order-summary__subtotal-name">Shipping</div>
            <div className="order-summary__subtotal-price">Free</div>
          </div>
          <div className="col-xs-12 order-summary__subtotal">
            <div className="order-summary__subtotal-name">Tax</div>
            <div className="order-summary__subtotal-price">$0</div>
          </div>
          <div className="col-xs-12 order-summary__total">
            <div className="order-summary__total-name">Total</div>
            <div className="order-summary__total-price">${cartTotal} CAD</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart
});

export default connect(mapStateToProps)(CartSummary);
