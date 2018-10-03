import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import Quiz from '../components/Quiz';
import Contact from '../components/Contact';
import SignupPage from '../components/SignupPage';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import TermsOfUse from '../components/TermsOfUse';
import PrivacyPolicy from '../components/PrivacyPolicy';

// Collections

import CollectionPage from '../components/collections/CollectionPage';
import AsyncRoute from './AsyncRoute';


// Product
import ProductDetailPage from '../components/products/ProductDetailPage';

import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <AsyncRoute exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/quiz" component={Quiz} />
        <Route exact path="/account/signup" component={SignupPage} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />

        <AsyncRoute
          exact
          path="/collection/:collection"
          component={CollectionPage}
        />
        <AsyncRoute exact path="/products/:product" component={ProductDetailPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
