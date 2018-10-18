import React from 'react';
import Header from '../Header';
import SignupForm from './SignupForm';

const SignupPage = () => (
  <div>
    <Header defaultHeader={true} />
    <div className="container signup-page">
      <div className="row signup-page__content">
        <div className="col-xs-12">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
);

export default SignupPage;
