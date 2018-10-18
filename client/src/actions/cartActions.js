import axios from 'axios';
import { TOGGLE_CART_OPEN } from './types';
import _ from 'lodash';

// addToCart: dispatch to cart : cartObject (sku#, quantity)
export const toggleCartOpen = () => ({
  type: TOGGLE_CART_OPEN
});

export const addToCart = () => {};

export const fetchItemsFromCart = () => {};

export const removeItemFromCart = () => {};

export const plusQtyToCart = () => {};

export const minusQtyToCart = () => {};
