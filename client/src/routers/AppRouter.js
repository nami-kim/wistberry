import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import test from '../components/test';
// general info
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import TermsOfUse from '../components/TermsOfUse';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Contact from '../components/Contact';
import Quiz from '../components/Quiz';

// auth
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import AccountPage from '../components/account/AccountPage';
import MyProfile from '../components/account/MyProfile';
import OrderHistory from '../components/account/OrderHistory';
import AddressBook from '../components/account/AddressBook';
import PaymentDetails from '../components/account/PaymentDetails';

// Collections
import CollectionPage from '../components/collections/CollectionPage';
import AsyncRoute from './AsyncRoute';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Product
import ProductDetailPage from '../components/products/ProductDetailPage';

// Checkout
import CheckoutOption from '../components/checkout/CheckoutOption';
import CheckoutPage from '../components/checkout/CheckoutPage'


import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <AsyncRoute exact path="/" component={HomePage} />
        <PublicRoute path="/about" component={AboutPage} />
        <PublicRoute path="/contact" component={Contact} />
        <PublicRoute path="/quiz" component={Quiz} />
        <PrivateRoute exact path="/me/account" component={AccountPage} />
        <PrivateRoute exact path="/me/my-profile" component={MyProfile} />
        <PrivateRoute exact path="/me/order-history" component={OrderHistory} />
        <PrivateRoute exact path="/me/address-book" component={AddressBook} />
        <PrivateRoute
          exact
          path="/me/payment-details"
          component={PaymentDetails}
        />

        <PublicRoute exact path="/signup" component={SignupPage} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute path="/checkout-option" component={CheckoutOption}/>
        <PublicRoute path="/checkout" component={CheckoutPage} />
        <PublicRoute path="/terms-of-use" component={TermsOfUse} />
        <PublicRoute path="/privacy-policy" component={PrivacyPolicy} />
        <PublicRoute path="/test" component={test} />

        <AsyncRoute
          exact
          path="/collection/:collection"
          component={CollectionPage}
        />
        <AsyncRoute
          exact
          path="/products/:product"
          component={ProductDetailPage}
        />

        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
