import React, { Component } from 'react';
import AccountMenu from './AccountMenu';
import Header from '../Header';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ShippingForm from '../checkout/ShippingForm'

class AddressBookPage extends Component {
  state = {
    editInUse: false,
    addNewAddress: false
  };
  toggleEditInUse = () =>
    this.setState(() => ({ editInUse: !this.state.editInUse }));
  toggleAddNewAddress = () =>
    this.setState(() => ({ addNewAddress: !this.state.addNewAddress }));
  render() {
    const { shippingInfo } = this.props.user;
    const orderSummary = this.state.orders
      ? 'order details: to be updated'
      : 'You have not yet ordered any items.';
    return (
      <div>
        <Header defaultHeader={true} />
        <div className="container account-page">
          <div className="row">
            <div className="col-xs-12 col-md-4 hide-on-mobile">
              <AccountMenu currentPage="addressBook" />
            </div>
            <div className="col-xs-12 col-md-8">
              <div className="account-page__details">
                <div className="account-page__top-icons">
                  <span className="account-page__back-icon hide-on-desktop">
                    <Link to="/me/account">
                      <Icon
                        width="30"
                        height="30"
                        paths={ICON_PATHS['arrow-left-circle']}
                        pathStyle={{
                          strokeWidth: '.4',
                          fill: '#2a73cc',
                          stroke: '#2a73cc'
                        }}
                      />
                    </Link>
                  </span>
                  
                </div>
                <div className="account-page__title">Address Book</div>
                <div className="account-page__body">
                  <div className="account-page__order-history">
                    
                    <div className="account-page__current-address">
                      <span className="account-page__edit-icon">
                        <span>Edit</span>
                        <Icon
                          width="21"
                          height="21"
                          paths={ICON_PATHS['pencil']}
                          pathStyle={{
                            strokeWidth: '.3',
                            fill: '#999',
                            stroke: '#999'
                          }}
                        />
                      </span>
                      <div>Nami Kim</div>
                      <div>Unit 808</div>
                      <div>1028 Barclay St.</div>
                      <div>Vancouver, BC V6Z 3H8</div>
                      <div>Canada</div>
                    </div>
                    
                    <div className="account-page__add-new-address" onClick={this.toggleAddNewAddress}>Add New Address</div>
                  {this.state.addNewAddress && <div className="account-page__new-address-form">
                      <ShippingForm type="accountEdit" />
                    </div>}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AddressBookPage);
