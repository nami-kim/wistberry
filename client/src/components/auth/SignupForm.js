import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  registerUser,
  startUpdateUserProfile
} from '../../actions/authActions';
import Button from '../utils/Button';

class SignupInnerForm extends Component {
  render() {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      type
    } = this.props;

    return (
      <div>
        <Form className="signup-form">
          {type === 'signup' && (
            <div className="signup-form__label signup-form__item">
              <p className="signup-form__title">Create Account</p>
            </div>
          )}
          <div className="row signup-form__name">
            <div className="col-xs-6 no-gutter reduced-gutter-right">
              <div className="signup-form__item">
                <label className="signup-form__label" htmlFor="firstname">
                  First Name
                </label>
                <div className="signup-form__error">
                  {touched.firstname &&
                    errors.firstname && (
                      <p className="signup-form__error--item">
                        {errors.firstname}
                      </p>
                    )}
                </div>
                <Field
                  className="signup-form__field"
                  type="text"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-xs-6 no-gutter reduced-gutter-left">
              <div className="signup-form__item">
                <label className="signup-form__label" htmlFor="lastname">
                  Last Name
                </label>
                <div className="signup-form__error">
                  {touched.lastname &&
                    errors.lastname && (
                      <p className="signup-form__error--item">
                        {errors.lastname}
                      </p>
                    )}
                </div>
                <Field
                  className="signup-form__field"
                  type="text"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="signup-form__item">
            <label className="signup-form__label" htmlFor="email">
              Email
            </label>
            <Field
              className="signup-form__field"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <div className="signup-form__error">
              {touched.email &&
                errors.email && (
                  <p className="signup-form__error--item">{errors.email}</p>
                )}
            </div>
          </div>
          <div className="signup-form__item">
            <label className="signup-form__label" htmlFor="password">
              Password
            </label>
            <Field
              className="signup-form__field"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <div className="signup-form__error">
              {values.password !== '' &&
                !errors.password && (
                  <p className="signup-form__error--password-strong">
                    Password strength: Strong
                  </p>
                )}
              {values.password !== '' &&
                errors.password && (
                  <div>
                    <p className="signup-form__error--item">
                      Password strength: Weak
                    </p>
                    {errors.password.map((password, index) => (
                      <p key={index} className="signup-form__error--item">
                        {password}
                      </p>
                    ))}
                  </div>
                )}
            </div>
          </div>
          <div className="signup-form__item">
            <Button type="submit" disabled={isSubmitting}>
              {type}
            </Button>
            {type === 'signup' && (
              <p className="signup-form__label signup-form__policy-agreement">
                By registering you agree to our{' '}
                <Link to="/terms-of-use">Terms of Use</Link> and{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </p>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

const SignupFormFormik = withFormik({
  mapPropsToValues({ type, authUser, firstname, lastname, email, password }) {
    return {
      firstname: type === 'update' ? authUser.firstname : firstname || '',
      lastname: type === 'update' ? authUser.lastname : lastname || '',
      email: type === 'update' ? authUser.email : email || '',
      password: password || ''
    };
  },
  validate: values =>
    yup
      .object()
      .shape({
        email: yup
          .string()
          .email('Email is not valid')
          .required('Email is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(8, 'At least 8 characters')
          .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'Contains a number or symbol')
      })
      .validate(values, { abortEarly: false })
      .catch(err => {
        throw err.inner.reduce((errors, err) => {
          const prevErrorMsgs = errors[err.path] || [];
          return {
            ...errors,
            [err.path]: prevErrorMsgs.concat(err.message)
          };
        }, {});
      }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (props.type === 'signup') {
      props
        .registerUser(values, props.history)
        .then(() => {
          resetForm();
          setSubmitting(false);
          props.history.push('/');
        })
        .catch(err => {
          setSubmitting(false);
          const errors = err.response.data;
          return setErrors(errors);
        });
    } else if (props.type === 'update') {
      const updates = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password
      };
      props
        .startUpdateUserProfile(props.authUser.email, updates)
        .then(() => {
          resetForm();
          // setSubmitting(false);
          props.history.push('/me/my-profile');
        })
        .catch(err => {
          // setSubmitting(false);
          const errors = err.response.data;
          return setErrors(errors);
        });
    }
  }
})(SignupInnerForm);

const mapStateToProps = state => ({
  authUser: state.auth.authUser,
  isAuthenticated: !!state.auth.isAuthenticated
});

const SignupForm = connect(
  mapStateToProps,
  { registerUser, startUpdateUserProfile }
)(SignupFormFormik);

export default withRouter(SignupForm);
