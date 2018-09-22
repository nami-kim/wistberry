import React, { Component } from 'react';
import Payments from './Payments';

class Cart extends Component {
  render() {
    return (
      <div>
        <h1>Cart Page</h1>
        <Payments />
      </div>
    );
  }
}

export default Cart;
