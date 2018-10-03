import React from 'react';
import Header from './Header';
import { LoginForm, SignupForm } from './SignupForm';

const SignupPage = () => (
  <div>
    <Header defaultHeader={true} />
    <div className="container signup">
      <div className="container-narrow ">
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <LoginForm />
          </div>
          <div className="col-xs-12 col-lg-6">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignupPage;
