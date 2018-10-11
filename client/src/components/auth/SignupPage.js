import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { registerUser } from '../../actions/authActions';
import Header from '../Header';

const signupInnerForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  handleChange
}) => (
  <div>
    <Header defaultHeader={true} />

    <div className="container signup-page">
      <div className="row signup-page__content">
        <div className="col-xs-12">
          <Form className="signup-form">
            <div className="signup-form__label signup-form__item">
              <p className="signup-form__title">New Customers</p>
            </div>
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
                {touched.password &&
                  !errors.password && (
                    <p className="signup-form__error--password-strong">
                      Password strength: Strong
                    </p>
                  )}
                {touched.password &&
                  errors.password && (
                    <div>
                      <p className="signup-form__error--item">
                        Password strength: Weak
                      </p>
                      {errors.password.map(password => (
                        <p className="signup-form__error--item">{password}</p>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            <div className="signup-form__item">
              <button
                type="submit"
                className="signup-form__btn"
                disabled={isSubmitting}
              >
                Sign up
              </button>
              <p className="signup-form__label signup-form__policy-agreement">
                By registering you agree to our{' '}
                <Link to="/terms-of-use">Terms of Use</Link> and{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

const SignupForm = withFormik({
  mapPropsToValues({ firstname, lastname, email, password }) {
    return {
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
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
    console.log(values);
    props.registerUser(values, props.history);
    setErrors(props.errors);
    resetForm();
    setSubmitting(false);
  }
})(signupInnerForm);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const SignupPage = connect(
  mapStateToProps,
  { registerUser }
)(SignupForm);

export default withRouter(SignupPage);