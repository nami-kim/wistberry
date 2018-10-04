import React from 'react';
import Header from './Header';
import { LoginForm, SignupForm } from './SignupForm';

const SignupPage = () => (
  <div>
    <Header defaultHeader={true} />
    <div className="container signup-page">
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <div className="login__section">
              <LoginForm />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="signup__section">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>

);

export default SignupPage;
