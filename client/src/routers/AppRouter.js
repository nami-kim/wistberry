import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import Contact from '../components/Contact';
import Login from '../components/Login';
import Checkout from '../components/Checkout';
import Collection from '../components/plants/Collection';
import EasyCarePlants from '../components/plants/EasyCarePlants';
import LowLightPlants from '../components/plants/LowLightPlants';
import MediumBrightPlants from '../components/plants/MediumBrightPlants';
import AllPlantProducts from '../components/plants/AllPlantProducts';
import BestSellingPlants from '../components/plants/BestSellingPlants';
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
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/plants/all-products" component={AllPlantProducts} />
        <Route exact path="/plants/collection" component={Collection} />
        <Route
          exact
          path="/plants/collection/easy-care-plants"
          component={EasyCarePlants}
        />
        <Route
          exact
          path="/plants/collection/low-light-plants"
          component={LowLightPlants}
        />
        <Route
          exact
          path="/plants/collection/medium-bright-plants"
          component={MediumBrightPlants}
        />
        <Route
          exact
          path="/plants/collection/best-selling-plants"
          component={BestSellingPlants}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
