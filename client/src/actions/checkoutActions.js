import axios from 'axios';
import {
  HANDLE_TOKEN,
  ADD_SHIPPING_ADDRESS,
  SET_SHIPPING_ADDRESS_OPTIONS,
  SET_SELECTED_SHIPPING_ADDRESS,
  SET_BILLING_OPTIONS,
  SET_SELECTED_BILLING,
  // SET_NEWSLETTER,
  SET_CHECKOUT_EMAIL,
  SET_STRIPE_CUSTOMER_ID,
  RESET_CHECKOUT,
  CHANGE_CHECKOUT_VIEW
} from './types';
import _ from 'lodash';

// Stripe Billing
export const handleToken = token => dispatch => {
  dispatch({
    type: HANDLE_TOKEN,
    token
  });
};

export const submitToken = (token, order) => {
  // const token = this.getState().checkout.token.id;

  // const order = {
  //   currency: 'cad',
  //   items: [
  //     {
  //       type: 'sku',
  //       parent: 'sku_Dfd8fekKmrtZTU'
  //     }
  //   ],
  //   shipping: {
  //     name: 'Jenny Rosen',
  //     address: {
  //       line1: 'Unit 808',
  //       city: 'Vancouver',
  //       state: 'ON',
  //       country: 'CA',
  //       postal_code: 'V6E 0B1'
  //     }
  //   },
  //   email: 'jenny.rosen@example.com'
  // };
  return axios
    .post('/api/billing/stripe/charge', { token, order })
    .then(res => console.log(res.data));
};

// Checkout AddressForm
export const addShippingAddress = shippingAddress => ({
  type: ADD_SHIPPING_ADDRESS,
  shippingAddress
});
export const setSelectedShippingAddress = shippingAddress => ({
  type: SET_SELECTED_SHIPPING_ADDRESS,
  shippingAddress
});


export const startAddOrEditShippingAddress = (shippingAddress, options) => (
  dispatch,
  getState
) => {
  console.log('startAddOrEditShippingAddress running!');
  const { email, firstname, lastname, newsletter } = shippingAddress;
  const shippingAddressOnly = _.omit(shippingAddress, ['email', 'newsletter']);
  const {
    setAsSelectedShippingAddress = true,
    editShippingAddress = false
  } = options;

  // Newsletter signup func
  const signUpForNewsletter = (email, firstname, lastname) => {
    if (newsletter) {
      console.log(
        'Signing up for newsletter',
        `${email}, ${firstname}, ${lastname}`
      );
      // axios
      //   .post('/api/newsletter', { email, firstname, lastname })
      //   .then(res => console.log('Newsletter sign up successful'))
      //   .catch(err =>
      //     console.log('Something went wrong while signing up for Newsletter')
      //   );
    }
  };

  // Reset the default for shippingAddressOptions to false
  if (shippingAddress.defaultShippingAddress) {
    const newShippingAddressOptions = getState().checkout.shippingAddressOptions.map(
      option => ({ ...option, defaultShippingAddress: false })
    );
    dispatch(setShippingAddressOptions(newShippingAddressOptions));
  }

  const { isAuthenticated, authUser } = getState().auth;
  if (isAuthenticated) {
    const updateShippingAddressInDB = editShippingAddress
      ? axios.put('/api/users/me/shipping-address', {
          email: authUser.email,
          shippingAddress: shippingAddressOnly
        })
      : axios.post('/api/users/me/shipping-address', {
          email: authUser.email,
          shippingAddress: shippingAddressOnly
        });

    return updateShippingAddressInDB.then(({ data: user }) => {
      const { shippingAddressOptions } = user;
      dispatch(setShippingAddressOptions(shippingAddressOptions));
      dispatch(setCheckoutEmail(authUser.email));
      signUpForNewsletter(
        authUser.email,
        authUser.firstname,
        authUser.lastname
      );
      if (setAsSelectedShippingAddress) {
        dispatch(setSelectedShippingAddress(shippingAddressOnly));
      }
    });
  } else {
    // If not logged in, there's only one shippingAddressOptions
    return new Promise((resolve, reject) => {
      dispatch(setShippingAddressOptions([shippingAddressOnly]));
      if (setAsSelectedShippingAddress) {
        dispatch(setSelectedShippingAddress(shippingAddressOnly));
      }
      dispatch(setCheckoutEmail(email));
      signUpForNewsletter(email, firstname, lastname);
      resolve();
    });
  }
};

export const startAddOrEditBilling = (billing, options) => (
  dispatch,
  getState
) => {
  console.log('startAddOrEditBilling running!');
  // const { email, firstname, lastname, newsletter } = billing;
  // const shippingAddressOnly = _.omit(billing, ['email', 'newsletter']);
  const { setAsSelectedBilling = true, editBilling = false } = options;

  // Reset the default for billingOptions to false
  if (billing.defaultBilling) {
    const newBillingOptions = getState().checkout.billingOptions.map(
      option => ({ ...option, defaultBilling: false })
    );
    dispatch(setBillingOptions(newBillingOptions));
  }

  const { isAuthenticated, authUser } = getState().auth;
  if (isAuthenticated) {
    const updateBillingInDB = editBilling
      ? axios.put('/api/users/me/shipping-address', {
          email: authUser.email,
          billing
        })
      : axios.post('/api/users/me/shipping-address', {
          email: authUser.email,
          billing
        });

    return updateBillingInDB.then(({ data: user }) => {
      const { billingOptions } = user;
      dispatch(setBillingOptions(billingOptions));
      if (setAsSelectedBilling) {
        dispatch(setSelectedBilling(billing));
      }
    });
  } else {
    // If not logged in, there's only one shippingAddressOptions
    dispatch(setBillingOptions([billing]));

    if (setAsSelectedBilling) {
      dispatch(setSelectedBilling(billing));
    }
  }
};

export const startSetCheckout = user => dispatch => {
  console.log('startSetCheckout is running')
  console.log(user)
  const defaultShippingAddress =
    user.shippingAddressOptions.find(
      shippingAddress => shippingAddress.defaultShippingAddress === true
    ) || {};
  const defaultBilling =
    user.billingOptions.find(billing => billing.defaultBilling === true) || {};

  dispatch(setShippingAddressOptions(user.shippingAddressOptions));
  dispatch(setSelectedShippingAddress(defaultShippingAddress));
  dispatch(setBillingOptions(user.billingOptions));
  dispatch(setSelectedBilling(defaultBilling));
  dispatch(setStripeCustomerId(user.stripeCustomerId))
  dispatch(setCheckoutEmail(user.email));
};

export const changeCheckoutView = currentView => ({
  type: CHANGE_CHECKOUT_VIEW,
  currentView
});
// set shippingAddressOptions when login
export const setShippingAddressOptions = shippingAddressOptions => ({
  type: SET_SHIPPING_ADDRESS_OPTIONS,
  shippingAddressOptions
});
// set stripe customer id
export const setStripeCustomerId = stripeCustomerId => ({
  type: SET_STRIPE_CUSTOMER_ID,
  stripeCustomerId
})
// set billingOptions when login
export const setBillingOptions = billingOptions => ({
  type: SET_BILLING_OPTIONS,
  billingOptions
});
export const setSelectedBilling = billing => ({
  type: SET_SELECTED_BILLING,
  billing
});

// export const setNewsletter = newsletter => ({
//   type: SET_NEWSLETTER,
//   newsletter
// });
export const setCheckoutEmail = email => ({
  type: SET_CHECKOUT_EMAIL,
  email
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT
});
