import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../../actions/authActions';
import Button from '../utils/Button';
import PasswordForgotForm from './PasswordForgotForm';

class loginInnerForm extends Component {
  state = {
    passwordForgotFormOpen: false
  };
  onPasswordForgotClick = e => {
    this.setState(() => ({
      passwordForgotFormOpen: !this.state.passwordForgotFormOpen
    }));
  };
  render() {
    const { title, errors, touched, isSubmitting, formType } = this.props;

    return (
      <div>
        <Form
          className={`signup-form ${
            formType === 'userExistsModal' ? 'narrow-width' : ''
          }`}
        >
          {!this.state.passwordForgotFormOpen && (
            <div>
              <div className="signup-form__label signup-form__item">
                <p
                  className={`signup-form__title ${
                    title === 'login' ? 'to-uppercase' : ''
                  }`}
                >
                  {title}
                </p>
              </div>
              <div
                className={`signup-form__item ${formType === 'userExistsModal' &&
                  'no-display'}`}
              >
                <label className="signup-form__label" htmlFor="email">
                  Email
                </label>
                <Field
                  className="signup-form__field"
                  type="email"
                  name="email"
                />
                <div className="signup-form__error">
                  {touched.email &&
                    errors.email && (
                      <p className="signup-form__error--item">{errors.email}</p>
                    )}
                </div>
              </div>
              <div className="signup-form__item">
                <label className="signup-form__label" htmlFor="email">
                  Password
                </label>
                <Field
                  className="signup-form__field"
                  type="password"
                  name="password"
                />
                <div className="signup-form__error">
                  {touched.password &&
                    errors.password && (
                      <p className="signup-form__error--item">
                        {errors.password}
                      </p>
                    )}
                </div>
              </div>
              <div className="signup-form__item">
                <Button type="submit" disabled={isSubmitting}>
                  Log in
                </Button>
              </div>
              <div
                className="signup-form__label signup-form__forgot-password"
                onClick={this.onPasswordForgotClick}
              >
                <span className="signup-form__forgot-password--text">
                  Forgot password?
                </span>
              </div>
              <div className="signup-form__label signup-form__no-account">
                <p className={`${formType === 'userExistsModal' && 'no-display'}`}>
                  Don't have an account?
                </p>
                <Link
                  className={`${formType === 'userExistsModal' && 'no-display'}`}
                  to="/signup"
                >
                  <span className="signup-form__no-account--text">Sign up</span>
                </Link>
              </div>
            </div>
          )}
          {this.state.passwordForgotFormOpen && (
            <div>
              <PasswordForgotForm />
              <div
                className="signup-form__label signup-form__forgot-password"
                onClick={this.onPasswordForgotClick}
              >
                <span className="signup-form__forgot-password--text">
                  Cancel
                </span>
              </div>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export const LoginFormFormik = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || ''
    };
  },

  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is required'),
    password: yup.string().required('Password is required')
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (props.formType === 'loginPage' || 'checkoutOption') {
      props
        .loginUser(values, props.history)
        .then(() => {
          resetForm();
          setSubmitting(false);
          props.formType === 'loginPage' ? props.history.push('/me/account') : props.history.push('/checkout')
        })
        .catch(err => {
          setSubmitting(false);
          const errors = err.response.data;
          return setErrors(errors);
        });
    } else if (props.type === 'userExistsModal') {
      props
        .loginUser({email: props.email, password: values.password}, props.history)
        .then(() => {
          resetForm();
          setSubmitting(false);
          props.history.push('/checkout');
        })
        .catch(err => {
          setSubmitting(false);
          const errors = err.response.data;
          return setErrors(errors);
        });
    }
  }
})(loginInnerForm);

const LoginForm = connect(
  null,
  { loginUser }
)(LoginFormFormik);

export default withRouter(LoginForm);
