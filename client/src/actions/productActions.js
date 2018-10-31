import axios from 'axios';
import { GET_ALL_PRODUCTS, PRODUCT_LOADING } from './types';
import _ from 'lodash';

export const getAllProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get('/api/products/stripe')
    .then(res =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: null
      })
    );
};

// Product loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};


// Selectors from here
export const getAllPlantProducts = products =>
  products.filter(product => product.metadata.type === 'plant');

export const getAllPlantSkus = (allPlantProducts, skus) =>
  _.flatMap(allPlantProducts, plant =>
    skus.filter(sku => sku.product === plant.id)
  );

export const getAllPotProducts = products =>
  products.filter(product => product.metadata.type === 'pot');

export const getAllPotSkus = (allPotProducts, skus) =>
  _.flatMap(allPotProducts, pot => skus.filter(sku => sku.product === pot.id));

export const getAllBaseProducts = products =>
  products.filter(product => product.metadata.type === 'base');

export const getAllBaseSkus = (allBaseProducts, skus) =>
  _.flatMap(allBaseProducts, base =>
    skus.filter(sku => sku.product === base.id)
  );
