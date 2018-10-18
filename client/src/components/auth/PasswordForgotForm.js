import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { resetPassword } from '../../actions/authActions';
import Button from '../utils/Button';

export const loginInnerForm = ({ values, errors, touched, isSubmitting }) => (
  <Form className="signup-form">
    <div className="signup-form__label signup-form__item">
      <p className="signup-form__title">Forgot your password?</p>
      <p className="signup-form__title--comment">
        Not to worry! Enter your email and we'll send you a link to
        reset your password.
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
      <Button type="submit" disabled={isSubmitting}>
        Reset
      </Button>
    </div>
  </Form>
);

export const PasswordForgotFormFormik = withFormik({
  mapPropsToValues({ email }) {
    return {
      email: email || ''
    };
  },

  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is required')
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    props
      .resetPassword(values, props.history)
      .then(() => {
        console.log(values)
        // let user know that email has been sent.
        // resetForm(values.email);
        // props.history.push('/me/account');
      })
      .catch(err => {
        const errors = err.response.data;
        return setErrors(errors);
      });

    setSubmitting(false);
  }
})(loginInnerForm);

const PasswordForgotForm = connect(
  null,
  { resetPassword }
)(PasswordForgotFormFormik);

export default withRouter(PasswordForgotForm);
