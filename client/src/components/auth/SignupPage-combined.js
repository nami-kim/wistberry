import React from 'react';
import Header from '../Header';
import SignupForm from './SignupForm';
import { LoginForm } from './LoginForm';

const SignupPage = () => (
  <div>
    <Header defaultHeader={true} />
    <div className="container signup-page">
      <div className="row signup-page__content">
        <div className="col-xs-12 col-md-6 col-lg-6">
          <div className="login__section">
            <LoginForm />
          </div>
        </div>
        <div className="col-xs-12 col-md-6 col-lg-6">
          <div className="signup__section">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignupPage;
