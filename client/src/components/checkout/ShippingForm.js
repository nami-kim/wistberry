import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { SmallButton } from '../utils/Button';
import { checkUserEmail } from '../../actions/authActions';
import { toggleModalOpen } from '../../actions/modalActions';

class ShippingInnerForm extends Component {
  state = {
    currentCheckoutProcess: 'shipping'
  };
  submitAllErrors = () => {};
  render() {
    const { values, errors, isSubmitting, handleChange } = this.props;

    return (
      <div>
        <Form className="shipping-form">
          <div className="shipping-form__label shipping-form__item">
            <p className="shipping-form__title">
              <span className="text-red">01</span> Shipping
            </p>
          </div>
          <div className="shipping-form__item">
            <Field
              className={`shipping-form__field  ${
                errors.email ? 'border-bottom-error' : ''
              }`}
              
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="shipping-form__error">
                <p className="shipping-form__error--item">{errors.email}</p>
              </div>
            )}
            <label className="shipping-form__checkbox--outer">
              <Field
                className="shipping-form__checkbox"
                type="checkbox"
                name="newsletter"
                placeholder="newsletter"
                checked={values.newsletter}
              />
              <p className="shipping-form__checkbox--comment">
                Sign up for email updates (including plant-care information, new
                product launch and special offers). Unsubscribe anytime.
              </p>
            </label>
          </div>

          <div className="shipping-form__names row">
            <div className="col-xs-6 reduced-gutter-right">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={values.firstname}
                  onChange={handleChange}
                />
                {(errors.firstname || errors.lastname) && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.firstname}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xs-6 reduced-gutter-left">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={values.lastname}
                  onChange={handleChange}
                />
                {(errors.firstname || errors.lastname) && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.lastname}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  placeholder="Address"
                  type="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  placeholder="Apt, suite, etc."
                  type="apt"
                  name="apt"
                  value={values.apt}
                  onChange={handleChange}
                />
                {errors.apt && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">{errors.apt}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="shipping-form__city-postal row">
            <div className="col-xs-6 reduced-gutter-right">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                />
                {(errors.city || errors.postalCode) && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">{errors.city}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xs-6 reduced-gutter-left">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={values.postalCode}
                  onChange={handleChange}
                />
                {(errors.postalCode || errors.city) && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.postalCode}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="shipping-form__names row">
            <div className="col-xs-6 reduced-gutter-right">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={values.province}
                  onChange={handleChange}
                />
                {(errors.province || errors.phone) && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.province}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xs-6 reduced-gutter-left">
              <div className="shipping-form__item">
                <Field
                  className="shipping-form__field"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                />
                {(errors.phone || errors.province) && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">{errors.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="shipping-form__item shipping-form__country">
                <div className="shipping-form__country--flag">
                  <img
                    alt="country icon"
                    src="http://wistberry.imgix.net/images/flags/canada.png"
                    style={{
                      width: '3rem',
                      height: '2rem',
                      paddingTop: '3px',
                      display: 'inline-block'
                    }}
                  />
                  <span>Canada</span>
                </div>

                <p>We currently ship to Canada only.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="shipping-form__item">
                <SmallButton type="submit" disabled={isSubmitting}>
                  Next
                </SmallButton>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const ShippingFormFormik = withFormik({
  mapPropsToValues({
    firstname,
    lastname,
    email,
    address,
    city,
    postalCode,
    province,
    phone
  }) {
    return {
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
      address: address || '',
      city: city || '',
      postalCode: postalCode || '',
      province: province || '',
      phone: phone || ''
    };
  },
  validate: values =>
    yup
      .object()
      .shape({
        firstname: yup.string().required('Please enter your first name.'),
        lastname: yup.string().required('Please enter your last name.'),
        email: yup
          .string()
          .email('Email is not valid')
          .required('Email is required'),
        address: yup.string().required('Please enter your address.'),
        lastname: yup.string().required('Please enter your last name'),
        city: yup.string().required('City is required.'),
        postalCode: yup.string().required('Please enter postal code.'),
        province: yup.string().required('Please enter province.'),
        phone: yup.number().required('Please enter your phone number.')
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
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    props
      .checkEmailAddress(values.email)

      .catch(err => {
        const errors = err.response.data;
        if (errors.message) {
          toggleModalOpen();
        }
        console.log(errors);
      });

    setSubmitting(false);
  }
})(ShippingInnerForm);

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

const ShippingForm = connect(
  null,
  { checkUserEmail, toggleModalOpen }
)(ShippingFormFormik);

export default ShippingForm;
