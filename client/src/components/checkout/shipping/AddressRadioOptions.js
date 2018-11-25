import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setSelectedShippingAddress } from '../../../actions/checkoutActions';

class AddressRadioOptions extends Component {
  formatPhoneNumber = phoneNumberString => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  };
  handleChange = e => {
    const id = e.target.value;
    const selectedShippingAddress = this.props.checkout.shippingAddressOptions.find(
      address => address._id === id
    );
    this.props.setSelectedShippingAddress(selectedShippingAddress);
  };
  render() {
    const {
      shippingAddressOptions,
      selectedShippingAddress
    } = this.props.checkout;
    console.log(shippingAddressOptions);
    return (
      <div
        className={`checkout__customer-address ${
          this.props.show ? '' : 'no-display'
        }`}
      >
        <form>
          {_.isEmpty(shippingAddressOptions) && (
            <p>You haven't added an address yet.</p>
          )}
          {shippingAddressOptions.map(address => {
            const {
              _id,
              firstname,
              lastname,
              address2,
              address1,
              city,
              postalCode,
              province,
              country,
              phone,
              defaultShippingAddress
            } = address;

            return (
              <div key={_id} className="checkout__address-options">
                <div className="checkout_address-options-radio-wrapper">
                  <input
                    className="checkout__address-options-radio-check"
                    type="radio"
                    value={_id}
                    checked={_id === selectedShippingAddress._id}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="checkout__address-options-summary">
                  <div className="checkout__address-options-name">
                    {`${firstname} ${lastname}`}{' '}
                    {defaultShippingAddress && <span>(Default)</span>}
                  </div>
                  <div>{`${address2}, ${address1}`}</div>
                  <div>{`${city}, ${province} ${postalCode}`}</div>
                  <div>{this.formatPhoneNumber(phone)}</div>
                  <div>{country}</div>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout
});

export default connect(
  mapStateToProps,
  { setSelectedShippingAddress }
)(AddressRadioOptions);
