import axios from 'axios';
import { TOGGLE_MODAL_OPEN } from './types';
import _ from 'lodash';

// addToCart: dispatch to cart : cartObject (sku#, quantity)
export const toggleModalOpen = () => ({
  type: TOGGLE_MODAL_OPEN
});

