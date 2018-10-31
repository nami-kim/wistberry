import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { SmallButton, EditButton } from '../utils/Button';
import { checkUserEmail } from '../../actions/authActions';
import Modal from '../utils/Modal';
import LoginForm from '../auth/LoginForm';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { addShippingInfo } from '../../actions/checkoutActions';
import Select, { Option, ReactSelectProps } from 'react-select';

class ShippingForm extends Component {
  state = {
    shippingInfo: this.props.shippingInfo || {},
    shippingFormOpen: true,
    modalOpen: false,
    continueAsGuest: false
  };

  toggleModalOpen = e => {
    this.setState(() => ({ modalOpen: !this.state.modalOpen }));
  };
  continueAsGuest = e => {
    this.setState(() => ({
      modalOpen: !this.state.modalOpen,
      continueAsGuest: true
    }));
  };
  toggleShippingFormOpen = () =>
    this.setState(() => ({
      shippingFormOpen: !this.state.shippingFormOpen
    }));

  handleSubmit = (values, { props, resetForm, setErrors, setSubmitting }) => {
    if (!this.state.continueAsGuest) {
      checkUserEmail(values.email)
        .then(res => {
          if (res.data.userExists) {
            this.toggleModalOpen();
          }
        })
        .catch(err => console.log(err));
    } else {
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
      this.toggleShippingFormOpen();
    }
    setSubmitting(false);
  };

  render() {
    return (
      <Formik
        initialValues={{
          firstname: this.state.shippingInfo.firstname || '',
          lastname: this.state.shippingInfo.lastname || '',
          email: this.state.shippingInfo.email || '',
          address1: this.state.shippingInfo.address1 || '',
          address2: this.state.shippingInfo.address2 || '',
          city: this.state.shippingInfo.city || '',
          postalCode: this.state.shippingInfo.postalCode || '',
          province: this.state.shippingInfo.province || '',
          phone: this.state.shippingInfo.phone || '',
          newsletter: false
        }}
        onSubmit={this.handleSubmit}
        validate={values =>
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
            })
        }
        validateOnBlur={false}
        validateOnChange={false}
        render={props =>
          ShippingInnerForm({
            state: this.state,
            toggleModalOpen: this.toggleModalOpen,
            continueAsGuest: this.continueAsGuest,
            toggleShippingFormOpen: this.toggleShippingFormOpen,
            type: this.props.type,
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
  toggleModalOpen,
  continueAsGuest,
  toggleShippingFormOpen,
  state,
  type
}) => {
  const iconCross = (
    <div onClick={toggleModalOpen}>
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
  const options = [
    
  ]
  return (
    <div>
      {state.modalOpen && (
        <Modal>
          {iconCross}
          <div className="user-exists-modal">
            <div className="user-exists-modal__header">
              {values.email} is already registered. You can login here!
            </div>
            <LoginForm type="userExists" />
            <div
              className="user-exists-modal__content"
              onClick={continueAsGuest}
            >
              No Thanks, I'll continue as a guest.
            </div>
          </div>
        </Modal>
      )}
      <Form className="shipping-form">
        {type === 'checkout' && (
          <div>
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
                  Sign up for email updates (including plant-care information,
                  new product launch and special offers). Unsubscribe anytime.
                </p>
              </label>
            </div>
          </div>
        )}

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
              {state.shippingFormOpen && (
                <SmallButton type="submit" disabled={isSubmitting}>
                  Next
                </SmallButton>
              )}
              {!state.shippingFormOpen && (
                <EditButton type="submit" disabled={isSubmitting}>
                  Edit
                </EditButton>
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  shippingInfo: state.checkout.shippingInfo
});
export default connect(
  mapStateToProps,
  { addShippingInfo }
)(ShippingForm);
