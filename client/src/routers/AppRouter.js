import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ScrollToTop from '../components/ScrollToTop';

import test from '../components/test';
import Footer from '../components/Footer'
// General
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import TermsOfUse from '../components/TermsOfUse';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Contact from '../components/Contact';
import Quiz from '../components/Quiz';
import GetStarted from '../components/GetStarted';
import BlogPage from '../components/BlogPage';

// Auth
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';

// Account
import AccountPage from '../components/account/AccountPage';
import MyProfilePage from '../components/account/MyProfilePage';
import OrderHistoryPage from '../components/account/OrderHistoryPage';
import AddressBookPage from '../components/account/AddressBookPage';
import PaymentDetailsPage from '../components/account/PaymentDetailsPage';

// Collections
import CollectionPage from '../components/collections/CollectionPage';
import YouMayAlsoLike from '../components/collections/YouMayAlsoLike';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Product
import ProductDetailPage from '../components/products/ProductDetailPage';

// Checkout
import CheckoutOption from '../components/checkout/CheckoutOption';
import CheckoutPage from '../components/checkout/CheckoutPage';

import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <ScrollToTop>
      <div>
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/about" component={AboutPage} />
          <PublicRoute path="/contact" component={Contact} />
          <PublicRoute path="/quiz" component={Quiz} />
          <PublicRoute path="/get-started" component={GetStarted} />
          <PublicRoute path="/blog" component={BlogPage} />
          
          <PrivateRoute exact path="/me/account" component={AccountPage} />

          <PrivateRoute exact path="/me/my-profile" component={MyProfilePage} />
          <PrivateRoute
            exact
            path="/me/order-history"
            component={OrderHistoryPage}
          />
          <PrivateRoute
            exact
            path="/me/address-book"
            component={AddressBookPage}
          />
          <PrivateRoute
            exact
            path="/me/payment-details"
            component={PaymentDetailsPage}
          />

          <PublicRoute exact path="/signup" component={SignupPage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute path="/checkout-option" component={CheckoutOption} />
          <PublicRoute path="/checkout" component={CheckoutPage} />
          <PublicRoute path="/terms-of-use" component={TermsOfUse} />
          <PublicRoute path="/privacy-policy" component={PrivacyPolicy} />
          <PublicRoute path="/test" component={test} />

          <PublicRoute
            exact
            path="/collection/:collection"
            component={CollectionPage}
          />
          
          <PublicRoute
            exact
            path="/products/:product"
            component={ProductDetailPage}
          />

          <PublicRoute component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </ScrollToTop>
  </Router>
);

export default AppRouter;
