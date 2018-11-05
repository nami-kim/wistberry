import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { toggleCartOpen } from '../actions/cartActions';
import { OrangeButton } from './utils/Button';
import CartItem from './CartItem';
import withRouter from 'react-router-dom/withRouter';

class Cart extends Component {
  handleContinueShopping = e => {
    e.preventDefault(e);
    this.props.toggleCartOpen();
    this.props.history.push('/');
  };
  render() {
    const { toggleCartOpen, cart } = this.props;

    const cartTotal = (
      cart.reduce(
        (prev, { group }) => prev + group.plantPrice * group.quantity,
        0
      ) / 100
    ).toFixed(0);

    const cartItems = cart.map(cartItem => (
      <CartItem
        type="cart"
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

    let cartDisplay;

    if (_.isEmpty(cart)) {
      cartDisplay = (
        <div>
          <p className="cart-page__no-items">
            You have no items in your shopping cart.
          </p>
          <div className="cart-page__continue-shopping">
            <OrangeButton onClick={this.handleContinueShopping}>
              Continue Shopping
            </OrangeButton>
          </div>
        </div>
      );
    } else {
      cartDisplay = (
        <div>
          {cartItems}
          <div className="cart-page__bottom">
            <div className="col-xs-12 cart-page__subtotal">
              <span className="cart-page__subtotal-name">Subtotal</span>
              <span className="cart-page__subtotal-price">{cartTotal} CAD</span>
            </div>
            <div className="col-xs-12 cart-page__subtotal">
              <div className="cart-page__subtotal-name">Shipping</div>
              <div className="cart-page__subtotal-price">Free</div>
            </div>
          </div>
          <Link
            to={this.props.isAuthenticated ? '/checkout' : '/checkout-option'}
          >
            <OrangeButton onClick={toggleCartOpen}>Checkout</OrangeButton>
          </Link>
        </div>
      );
    }

    return (
      <div className="cart-background">
        <div className="container cart-page">
          <div className="cart-page__top">
            <div className="cart-page__cross-icon" onClick={toggleCartOpen}>
              <Icon
                width="31"
                height="31"
                paths={ICON_PATHS['cross']}
                pathStyle={{
                  strokeWidth: '.4',
                  fill: 'black',
                  stroke: 'black'
                }}
              />
            </div>

            <div>My Cart</div>
            <div className="cart-page__cart-icon">
              <Icon
                width="35"
                height="35"
                paths={ICON_PATHS['cart']}
                pathStyle={{
                  strokeWidth: '.4',
                  fill: 'black',
                  stroke: 'black'
                }}
              />
              <div className="cart-page__cart-count">
                <div>{this.props.cart.length}</div>
              </div>
            </div>
          </div>
          <div className="cart-page__free-shipping">
            Free Shipping on All Orders!
          </div>
          {cartDisplay}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { toggleCartOpen }
)(withRouter(Cart));
