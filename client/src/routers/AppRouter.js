import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import Contact from '../components/Contact';
import Login from '../components/Login';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';

// Collections
import AllCollections from '../components/collections/AllCollections';
import AllPlants from '../components/collections/AllPlants';
import BestSellingPlants from '../components/collections/BestSellingPlants';
import EasyCarePlants from '../components/collections/EasyCarePlants';
import LowLightPlants from '../components/collections/LowLightPlants';
import MediumBrightPlants from '../components/collections/MediumBrightPlants';
import PerfectForGifts from '../components/collections/PerfectForGifts';
import PetFriendlyPlants from '../components/collections/PetFriendlyPlants';

// Product


import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/account/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />

        <Route exact path="/collection/all-collections" component={AllCollections} />
        <Route exact path="/collection/all-plants" component={AllPlants} />
        <Route exact path="/collection/best-selling-plants" component={BestSellingPlants} />
        <Route exact path="/collection/easy-care-plants" component={EasyCarePlants} />
        <Route exact path="/collection/easy-care-plants" component={LowLightPlants} />
        <Route exact path="/collection/easy-care-plants" component={MediumBrightPlants} />
        <Route exact path="/collection/perfect-for-gits" component={PerfectForGifts} />
        <Route exact path="/collection/pet-friendly-plants" component={PetFriendlyPlants} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
