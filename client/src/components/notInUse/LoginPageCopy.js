import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../../actions/authActions';
import Header from '../Header';

export const loginInnerForm = ({ values, errors, touched, isSubmitting }) => (
  <div>
    <Header defaultHeader={true} />
    <div className="container signup-page">
      <div className="row signup-page__content">
        <div className="col-xs-12">
          <Form className="signup-form">
            <div className="signup-form__label signup-form__item">
              <p className="signup-form__title">Login</p>
            </div>
            <div className="signup-form__item">
              <label className="signup-form__label" htmlFor="email">
                Email
              </label>
              <Field className="signup-form__field" type="email" name="email" />
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
              <button
                type="submit"
                className="black-lg-btn"
                disabled={isSubmitting}
              >
                Log in
              </button>
            </div>
            <div className="signup-form__label signup-form__forgot-password">
              Forgot password?
            </div>
          </Form>
        </div>

        <div className="col-xs-12">
          <Form className="signup-form">
            <div className="signup-form__label signup-form__item">
              <p className="signup-form__title">Forgot your password?</p>
              <p className="signup-form__title--comment">
                Not to worry! Give us your email, and we'll send you a password
                reset link.
              </p>
            </div>
            <div className="signup-form__item">
              <label className="signup-form__label" htmlFor="email">
                Email
              </label>
              <Field className="signup-form__field" type="email" name="email" />
              <div className="signup-form__error">
                {touched.email &&
                  errors.email && (
                    <p className="signup-form__error--item">{errors.email}</p>
                  )}
              </div>
            </div>
            <div className="signup-form__item">
              <button
                type="submit"
                className="black-lg-btn"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

export const LoginForm = withFormik({
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
    props.loginUser(values, props.history);
    setErrors(props.errors);
    resetForm();
    setSubmitting(false);
  }
})(loginInnerForm);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const LoginPage = connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);

export default withRouter(LoginPage);

// componentDidMount() {
//   if (this.props.auth.isAuthenticated) {
//     this.props.history.push('/')
//   }
// }
