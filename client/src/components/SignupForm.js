import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

// Login Form starts here
export const loginInnerForm = ({ values, errors, touched, isSubmitting }) => (
  <Form className="signup-form">
    <div className="signup-form__label signup-form__item">
      <p className="signup-form__title">Login</p>
    </div>
    <div className="signup-form__item">
      <label className="signup-form__label" htmlFor="email">
        Email
      </label>
      {touched.email &&
        errors.email && <p className="signup-form__error">{errors.email}</p>}
      <Field className="signup-form__field" type="email" name="email" />
    </div>
    <div className="signup-form__item">
      <label className="signup-form__label" htmlFor="email">
        Password
      </label>
      {touched.password &&
        errors.password && (
          <p className="signup-form__error">{errors.password}</p>
        )}
      <Field className="signup-form__field" type="password" name="password" />
    </div>
    <div className="signup-form__item">
      <button
        className="signup-form__field signup-form__btn"
        disabled={isSubmitting}
      >
        Log in
      </button>
    </div>
  </Form>
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
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'nm1077@gmail.com') {
        setErrors({ email: 'That email is already taken.' });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 1000);
  }
})(loginInnerForm);

// Signup Form starts here

export const signupInnerForm = ({ values, errors, touched, isSubmitting }) => (
  <Form className="signup-form">
    <div className="signup-form__label signup-form__item">
      <p className="signup-form__title">New Customers</p>
    </div>
    <div className="signup-form__item">
      <label className="signup-form__label" htmlFor="firstname">
        First Name
      </label>
      {touched.firstname &&
        errors.firstname && (
          <p className="signup-form__error">{errors.firstname}</p>
        )}
      <Field className="signup-form__field" type="text" name="firstname" />
    </div>
    <div className="signup-form__item">
      <label
        className="signup-form__label"
        htmlFor="lastname"
      >
        Last Name
      </label>
      {touched.lastname &&
        errors.lastname && (
          <p className="signup-form__error">{errors.lastname}</p>
        )}
      <Field className="signup-form__field" type="text" name="lastname" />
    </div>
    <div className="signup-form__item">
      <label className="signup-form__label" htmlFor="email">
        Email
      </label>
      {touched.email &&
        errors.email && <p className="signup-form__error">{errors.email}</p>}
      <Field className="signup-form__field" type="email" name="email" />
    </div>
    <div className="signup-form__item">
      <label className="signup-form__label" htmlFor="password">
        Password
      </label>
      {touched.password &&
        errors.password && (
          <p className="signup-form__error">{errors.password}</p>
        )}
      <Field className="signup-form__field" type="password" name="password" />
    </div>
    <div className="signup-form__item">
      <label className="signup-form__label" htmlFor="passwordConfirmation">
        Confirm Password
      </label>
      {touched.passwordConfirmation &&
        errors.passwordConfirmation && (
          <p className="signup-form__error">{errors.passwordConfirmation}</p>
        )}
      <Field className="signup-form__field" type="password" name="passwordConfirmation" />
    </div>
    <div className="signup-form__item">
      <button
        className="signup-form__field signup-form__btn"
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
);

export const SignupForm = withFormik({
  mapPropsToValues({ name, email, password, passwordConfirmation }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      passwordConfirmation: passwordConfirmation || ''
    };
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is rquired'),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters or longer')
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .required('Password confirmation is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'nm1077@gmail.com') {
        setErrors({ email: 'That email is already taken.' });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 1000);
  }
})(signupInnerForm);
