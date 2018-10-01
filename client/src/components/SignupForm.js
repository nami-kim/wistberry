import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import Button from './Button';

// Login Form starts here
export const loginInnerForm = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
    <label htmlFor="email">Email</label>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="email"
        placeholder="Email"
        name="email"
      />
    </div>
    <div>
      <label htmlFor="email">Password</label>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="password"
        placeholder="Password"
        name="password"
      />
    </div>
    <div className="mv3">
      <Button disabled={isSubmitting}>Submit</Button>
    </div>
  </Form>
);

export const LoginForm = withFormik({
  mapPropsToValues({ email, password}) {
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
    password: yup
      .string()
      .min(8, 'Password must be 8 characters or longer')
      .required('Password is required')
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
  <Form className="row flex">
    <div className="">
      <label htmlFor="firstname">First Name</label>
      {touched.firstname && errors.firstname && <p>{errors.firstname}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="text"
        placeholder="First Name"
        name="firstname"
      />
    </div>
    <div>
      <label htmlFor="lastname">Last Name</label>
      {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="text"
        placeholder="Last Name"
        name="lastname"
      />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="email"
        placeholder="Email"
        name="email"
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="password"
        placeholder="Password"
        name="password"
      />
    </div>
    <div>
      <label htmlFor="password2">Confirm Password</label>
      {touched.password2 && errors.password2 && <p>{errors.password2}</p>}
      <Field
        className="db w-100 pa2 mv3 ba b--black-20"
        type="password2"
        placeholder="Confirm Password"
        name="password2"
      />
    </div>
    <label>
      <Field
        className="mr2"
        type="checkbox"
        name="newsletter"
        placeholder="newsletter"
        checked={values.newsletter}
      />
      Subscribe to our weekley newsletter
    </label>
    <div className="mv3">
      <Button disabled={isSubmitting}>Submit</Button>
    </div>
  </Form>
);

export const SignupForm = withFormik({
  mapPropsToValues({ name, email, password, password2, newsletter }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      password2: password2 || '',
      newsletter: newsletter || false
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
      .required('Password is required')
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


