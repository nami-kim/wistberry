import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { logoutUser } from '../../actions/authActions';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';

class AccountMenu extends Component {
  state = {};
  onLogoutClick = e => {
    e.preventDefault(e);
    this.props.logoutUser();
    this.props.history.push('/login');
  };
  render() {
    const accountIcon = iconName => (
      <Icon
        width="23"
        height="23"
        paths={ICON_PATHS[iconName]}
        pathStyle={{
          strokeWidth: '.3',
          stroke: 'black'
        }}
        className="account-page__menu-icon"
      />
    );

    return (
      <div>
        <Header defaultHeader={true} />
        <div className="container account-page">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <div className="account-page__nav">
                <div className="account-page__menu-title">My Account</div>
                <div className="account-page__menu">
                  <Link
                    to="/me/my-profile"
                    className="account-page__menu-items"
                  >
                    {accountIcon('user')}
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/me/account-history"
                    className="account-page__menu-items"
                  >
                    {accountIcon('history')}
                    <span>Order History</span>
                  </Link>
                  <Link
                    to="/me/address-book"
                    className="account-page__menu-items"
                  >
                    {accountIcon('address')}
                    <span>Address Book</span>
                  </Link>
                  <Link
                    to="/me/payment-details"
                    className="account-page__menu-items"
                  >
                    {accountIcon('credit-card')}
                    <span>Payment Details</span>
                  </Link>
                  <Link
                    to="#"
                    onClick={this.onLogoutClick}
                    className="account-page__menu-items"
                  >
                    {accountIcon('cross-square')}
                    <span>Log Out</span>
                  </Link>
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
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(AccountMenu);
