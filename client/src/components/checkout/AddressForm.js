import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provinces from '../common/provinces';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { SmallButton } from '../utils/Button';
import _ from 'lodash';

class AddressForm extends Component {
  getInitialValues = () => {
    const initialValues = _({
      firstname: '',
      lastname: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      province: '',
      phone: '',
      defaultShippingAddress: true,
      country: 'Canada',
      newsletter: true,
    })
      .omit(this.props.excludeFields || [])
      .valueOf();
    return { ...initialValues, ...this.props.initialValues };
  };
  getYupShape = () => {
    return _({
      firstname: yup.string().required('Please enter your first name.'),
      lastname: yup.string().required('Please enter your last name.'),
      email: yup
        .string()
        .email('Email is not valid')
        .required('Email is required'),
      address1: yup.string().required('Please enter your address.'),
      city: yup.string().required('City is required.'),
      postalCode: yup.string().required('Please enter postal code.'),
      province: yup.string().required('Please enter province.'),
      phone: yup.number().required('Please enter your phone number.'),
      country: yup.string().required('Country is required.')
    })
      .omit(this.props.excludeFields || [])
      .valueOf();
  };
  handleSubmit = (value, { setSubmitting, resetForm }) => {
    console.log('value', value);
    this.props.onSubmit(value, { setSubmitting, resetForm });
  };

  render() {
    return (
      <Formik
        initialValues={this.getInitialValues()}
        onSubmit={this.handleSubmit}
        validate={values =>
          yup
            .object()
            .shape(this.getYupShape())
            .validate(values, { abortEarly: false })
            .catch(err => {
              throw err.inner.reduce((errors, err) => {
                const prevErrorMsgs = errors[err.path] || [];
                return {
                  ...errors,
                  [err.path]: prevErrorMsgs.concat(err.message)
                };
              }, {});
            })
        }
        validateOnBlur={false}
        validateOnChange={false}
        render={props =>
          ShippingInnerForm({
            ...this.props,
            ...props
          })
        }
      />
    );
  }
}
const ShippingInnerForm = ({
  values,
  errors,
  isSubmitting,
  handleChange,
  show,
  excludeFields = [],
  buttonText
}) => {
  return (
    <div className={show ? '' : 'no-display'}>
      <Form className="shipping-form">
        {errors.email}
        <div>
          <div className="shipping-form__item">
            <div
              className={excludeFields.includes('email') ? 'no-display' : ''}
            >
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
            </div>
            <div
              className={
                excludeFields.includes('newsletter') ? 'no-display' : ''
              }
            >
              <label className="shipping-form__checkbox--outer">
                <Field
                  className="shipping-form__checkbox"
                  type="checkbox"
                  name="newsletter"
                  placeholder="newsletter"
                  checked={values.newsletter}
                />
                <p className="shipping-form__checkbox--comment">
                  Keep me up to date on plant-care information and special
                  offers
                </p>
              </label>
            </div>
          </div>
        </div>
        <div>
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
                  type="address1"
                  name="address1"
                  value={values.address1}
                  onChange={handleChange}
                />
                {errors.address1 && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.address1}
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
                  type="address2"
                  name="address2"
                  value={values.address2}
                  onChange={handleChange}
                />
                {errors.address2 && (
                  <div className="shipping-form__error">
                    <p className="shipping-form__error--item">
                      {errors.address2}
                    </p>
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
              <div className="shipping-form__field shipping-form__select-wrapper">
                <Field
                  className="shipping-form__select-inner"
                  component="select"
                  name="province"
                  placeholder="Province"
                  value={values.province}
                  onChange={handleChange}
                >
                  <option value="Province" className="no-display">
                    Province
                  </option>
                  {_.toPairs(provinces).map(([code, name]) => {
                    return (
                      <option value={code} key={code}>
                        {name}
                      </option>
                    );
                  })}
                </Field>
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
              <Field
                className="no-display"
                type="text"
                name="country"
                placeholder="Country"
                value={values.country}
                onChange={handleChange}
              />
            </div>
            <div className="shipping-form__default-address">
              <div className="col-xs-12">
                <label className="shipping-form__checkbox--outer">
                  <Field
                    className="shipping-form__checkbox"
                    type="checkbox"
                    name="defaultShippingAddress"
                    placeholder="default shipping address"
                    checked={values.defaultShippingAddress}
                  />
                  <p className="shipping-form__checkbox--comment">
                    Use as default shipping address
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="shipping-form__item">
              <SmallButton type="submit" disabled={isSubmitting}>
                {buttonText}
              </SmallButton>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

AddressForm.propTypes = {
  show: PropTypes.bool,
  excludeFields: PropTypes.array,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func, // given the same args as Formik handleSubmit
  buttonText: PropTypes.string
};

export default AddressForm;
