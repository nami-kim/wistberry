import React, { Component } from 'react';
import Header from '../Header';
import LoginForm from './LoginForm';
import PasswordForgotForm from './PasswordForgotForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Header defaultHeader={true} />
        <div className="container signup-page">
          <div className="row signup-page__content">
            <div className="col-xs-12">
              <LoginForm title="login" formType="loginPage"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
