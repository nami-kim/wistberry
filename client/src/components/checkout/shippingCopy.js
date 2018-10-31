import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Persist } from 'formik-persist';
import * as yup from 'yup';
import { SmallButton } from '../utils/Button';
import { checkUserEmail } from '../../actions/authActions';
import Modal from '../utils/Modal';
import LoginForm from '../auth/LoginForm';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { addShippingInfo } from '../../actions/checkoutActions';

class ShippingInnerForm extends Component {
  state = {
    currentCheckoutProcess: 'shipping',
    shippingInfo: {}
  };

  toggleModalOpen = e => {
    console.log(this.props.setStatus);
    this.props.setStatus({ modalOpen: false });
    console.log(this.props.status);
  };
  render() {
    const {
      values,
      errors,
      isSubmitting,
      handleChange,
      status = { modalOpen: false }
    } = this.props;
    const iconCross = (
      <div onClick={this.toggleModalOpen}>
        <Icon
          width="31"
          height="31"
          paths={ICON_PATHS['cross']}
          pathStyle={{
            strokeWidth: '.4',
            fill: 'black',
            stroke: 'black'
          }}
          style={{ display: 'inline-block' }}
        />
      </div>
    );
    return (
      <div>
        {status.modalOpen && (
          <Modal>
            {iconCross}
            <div className="user-exists-modal">
              <div className="user-exists-modal__header">
                {values.email} is already registered. You can login here!
              </div>
              <LoginForm type="userExists" />
              <div
                className="user-exists-modal__content"
                onClick={this.toggleModalOpen}
              >
                No Thanks, I'll continue as a guest.
              </div>
            </div>
          </Modal>
        )}
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
                  component="select"
                  className="shipping-form__field"
                  name="province"
                  placeholder="Province"
                  value={values.province}
                  onChange={handleChange}
                >
                  <option value="Province" className="no-display">
                    Province
                  </option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Manitoba">Manitoba</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Newfoundland and Labrador">
                    Newfoundland and Labrador
                  </option>
                  <option value="Northwest Territories">
                    Northwest Territories
                  </option>
                  <option value="Nova Scotia">Alberta</option>
                  <option value="Nunavut">Nunavut</option>
                  <option value="Ontario">Ontario</option>
                  <option value="Prince Edward Island">
                    Prince Edward Island
                  </option>
                  <option value="Quebec">Quebec</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                  <option value="Yukon">Yukon</option>
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
    address1,
    address2,
    city,
    postalCode,
    province,
    phone,
    newsletter
  }) {
    return {
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
      address1: address1 || '',
      address2: address2 || '',
      city: city || '',
      postalCode: postalCode || '',
      province: province || '',
      phone: phone || '',
      newsletter: newsletter || false
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
        address1: yup.string().required('Please enter your address.'),
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
  handleSubmit(
    values,
    { props, resetForm, setStatus, setErrors, setSubmitting }
  ) {
    checkUserEmail(values.email)
      .then(res => {
        if (res.data.userExists) {
          setStatus({ modalOpen: true });
          console.log(props.status);
        }
      })
      .catch(err => console.log(err));
    const shippingInfo = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      postalCode: values.postalCode,
      province: values.province,
      phone: values.phone
    };

    addShippingInfo(shippingInfo);

    console.log(JSON.parse(localStorage.getItem('shippingInfo')));
    setSubmitting(false);
  }
})(ShippingInnerForm);

const ShippingForm = connect(
  null,
  null
)(ShippingFormFormik);

export default ShippingForm;
