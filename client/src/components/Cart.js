import React, { Component } from 'react';
import Payments from './Payments';
import Header from './Header';

class Cart extends Component {
  render() {
    return (
      <div>
        <Header defaultHeader={true} />
        <h1>Cart Page</h1>
        <Payments />
      </div>
    );
  }
}

export default Cart;
