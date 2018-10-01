import React from 'react';
import Header from './Header';
import { LoginForm, SignupForm } from './SignupForm';

const Signup = () => (
  <div>
    <Header defaultHeader={true} />
    <div className="container-body">
      <div className="row signup-content">
        <div className="col-lg-6">
          <LoginForm />
        </div>
        <div className="col-lg-6">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
