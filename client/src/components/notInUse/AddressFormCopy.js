import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { SmallButton, EditButton } from '../utils/Button';
import { checkUserEmail } from '../../actions/authActions';
import Modal from '../utils/Modal';
import LoginForm from '../auth/LoginForm';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import _ from 'lodash';
import {
  startAddOrEditShippingAddress,
  setCheckoutEmail,
} from '../../actions/checkoutActions';

class AddressForm extends Component {
  state = {
    shippingFormOpen: true,
    modalOpen: false,
    existingUserContinueAsGuest: false,
    selectedShippingAddress: {}
  };

  toggleModalOpen = () => {
    this.setState(() => ({ modalOpen: !this.state.modalOpen }));
  };
  existingUserContinueAsGuest = e => {
    this.setState(() => ({
      modalOpen: !this.state.modalOpen,
      existingUserContinueAsGuest: true
    }));
  };
  toggleShippingFormOpen = () =>
    this.setState(() => ({
      shippingFormOpen: !this.state.shippingFormOpen
    }));

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    console.log(this.props);
    const proceedToPaymentForm = () => {
      this.props.startAddOrEditShippingAddress(
        _.omit(values, ['newsletter', 'email'])
      );

      if (!this.props.isAuthenticated) {
        this.props.setCheckoutEmail(values.email);
      }
      setSubmitting(false);
      // props.history.push('/me/address-book');
      this.props.toggleShippingFormOpen();
      this.toggleShippingFormOpen();
    };

    if (this.state.existingUserContinueAsGuest || this.props.isAuthenticated) {
      proceedToPaymentForm();
      resetForm()
    } else {
      checkUserEmail(values.email)
        .then(res => {
          if (res.data.userExists) {
            this.toggleModalOpen();
            setSubmitting(false);
          } else {
            proceedToPaymentForm();
            resetForm()
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { selectedShippingAddress = {}, email = '' } = this.props.checkout;
    console.log(email)
    const getInitialValues = selectedShippingAddress => ({
      email: email || '',
      firstname:
        (selectedShippingAddress && selectedShippingAddress.firstname) || '',
      lastname:
        (selectedShippingAddress && selectedShippingAddress.lastname) || '',
      address1:
        (selectedShippingAddress && selectedShippingAddress.address1) || '',
      address2:
        (selectedShippingAddress && selectedShippingAddress.address2) || '',
      city: (selectedShippingAddress && selectedShippingAddress.city) || '',
      postalCode:
        (selectedShippingAddress && selectedShippingAddress.postalCode) || '',
      province:
        (selectedShippingAddress && selectedShippingAddress.province) || '',
      phone: (selectedShippingAddress && selectedShippingAddress.phone) || '',
      defaultShippingAddress:
        (selectedShippingAddress &&
          selectedShippingAddress.defaultShippingAddress) ||
        true,
      country: 'Canada'
    });

    return (
      <Formik
        initialValues={getInitialValues(selectedShippingAddress)}
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
              phone: yup.number().required('Please enter your phone number.'),
              country: yup.string().required('Country is required.')
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
            existingUserContinueAsGuest: this.existingUserContinueAsGuest,
            toggleAddressFormOpen: this.toggleAddressFormOpen,
            forExistingUser: this.props.forExistingUser,
            addNewAddress: this.props.addNewAddress,
            toggleAddNewAddress: this.props.toggleAddNewAddress,
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
  existingUserContinueAsGuest,
  toggleAddNewAddress,
  addNewAddress,
  state,
  forExistingUser,
  isAuthenticated
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
        style={{
          display: 'inline-block',
          marginLeft: '2rem',
          marginTop: '2rem'
        }}
      />
    </div>
  );
  console.log(values);
  return (
    <div>
      {state.modalOpen &&
        !isAuthenticated && (
          <Modal>
            {iconCross}
            <div className="user-exists-modal">
              <div className="user-exists-modal__header">
                {values.email} is already registered. You can login here!
              </div>
              <LoginForm
                className="user-exists-modal__login"
                formType="userExistsModal"
                email={values.email}
              />
              <div
                className="user-exists-modal__content"
                onClick={existingUserContinueAsGuest}
              >
                <p>No Thanks, I'll continue as a guest.</p>
              </div>
            </div>
          </Modal>
        )}

      <Form className="shipping-form">
        {errors.email}
        {!forExistingUser && (
          <div>
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
                  Keep me up to date on plant-care information and special
                  offers
                </p>
              </label>
            </div>
          </div>
        )}
        {((forExistingUser && addNewAddress) || !forExistingUser) && (
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
                      <p className="shipping-form__error--item">
                        {errors.city}
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
                      <p className="shipping-form__error--item">
                        {errors.phone}
                      </p>
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
        )}
        <div className="row">
          <div className="col-xs-12">
            <div className="shipping-form__item">
              {state.shippingFormOpen &&
                forExistingUser &&
                addNewAddress && (
                  <div>
                    <SmallButton type="submit" disabled={isSubmitting}>
                      Add a new address
                    </SmallButton>
                  </div>
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
  checkout: state.checkout,
  isAuthenticated: !!state.auth.isAuthenticated,
  authUser: state.auth.authUser
});
export default connect(
  mapStateToProps,
  { startAddOrEditShippingAddress, setCheckoutEmail }
)(AddressForm);
