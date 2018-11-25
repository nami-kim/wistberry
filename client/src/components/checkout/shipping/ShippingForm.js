import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddressRadioOptions from './AddressRadioOptions';
import AddressForm from '../AddressForm';
import { startAddOrEditShippingAddress, changeCheckoutView } from '../../../actions/checkoutActions';
import { SmallButton } from '../../utils/Button';
import _ from 'lodash';

class ShippingForm extends Component {
  state = {
    addNewAddressFormOpen: false
  };
  showAddNewAddressForm = () => {
    this.setState(() => ({
      addNewAddressFormOpen: !this.state.addNewAddressFormOpen
    }));
  };
  handleNextBtn = () => {
    this.props.changeCheckoutView('paymentView');
    console.log('handleNextBtn working');
  };
  handleSubmitForLoggedInUser = (values, { setSubmitting, resetForm }) => {
    this.props.startAddOrEditShippingAddress(values, {
      setAsSelectedShippingAddress: true,
      editShippingAddress: false
    });
    setSubmitting(false);
    resetForm();
    this.showAddNewAddressForm();
    console.log('handleSumbitForLoggedinUser working');
  };
  handleSubmitForNewUser = (values, { setSubmitting, resetForm }) => {
    this.props
      .startAddOrEditShippingAddress(values, {
        setAsSelectedShippingAddress: true,
        editShippingAddress: !_.isEmpty(
          this.props.checkout.selectedShippingAddress
        )
      })
      .then(() => {
        console.log('handleSumbitForNewUser working');
        setSubmitting(false);
        resetForm();
        this.props.changeCheckoutView('paymentView');
      });
  };
  componentDidMount() {}
  render() {
    const { isAuthenticated } = this.props;
    const { selectedShippingAddress, email } = this.props.checkout;
    const initialValues = { ...selectedShippingAddress, email };
    console.log(initialValues);
    return isAuthenticated ? (
      <div
        className={`checkout__login-view ${
          this.props.show ? '' : 'no-display'
        }`}
      >
        <AddressRadioOptions show={!this.state.addNewAddressFormOpen} />
        <div
          className="checkout__add-new-address"
          onClick={this.showAddNewAddressForm}
        >
          + Add a new address
        </div>
        <div className="checkout__new-address-form">
          <AddressForm
            show={this.state.addNewAddressFormOpen}
            excludeFields={['email', 'newsletter']}
            onSubmit={this.handleSubmitForLoggedInUser}
            buttonText="Add a new address"
          />
        </div>
        <div
          className={`checkout__add-new-address ${
            this.state.addNewAddressFormOpen ? '' : 'no-display'
          }`}
          onClick={this.showAddNewAddressForm}
        >
          Cancel
        </div>
        <div className="checkout__btn">
          <SmallButton
            show={!this.state.addNewAddressFormOpen}
            type="submit"
            onClick={this.handleNextBtn}
          >
            Next
          </SmallButton>
        </div>
      </div>
    ) : (
      <div>
        <AddressForm
          show={this.props.show}
          initialValues={initialValues}
          onSubmit={this.handleSubmitForNewUser}
          buttonText="Next"
        />
      </div>
    );
  }
}

AddressForm.propTypes = {
  show: PropTypes.bool
};

const mapStateToProps = state => ({
  checkout: state.checkout,
  isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { startAddOrEditShippingAddress, changeCheckoutView }
)(ShippingForm);
