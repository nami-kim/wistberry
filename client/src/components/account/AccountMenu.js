import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';

class AccountMenu extends Component {
  state = {
    hover: false
  };
  onLogoutClick = e => {
    e.preventDefault(e);
    this.props.logoutUser(this.props.history);
  };
  render() {
    // const currentPage =
    const iconColor = this.state.hover ? '#89c5da' : 'black';
    const accountIcon = iconName => (
      <Icon
        width="23"
        height="23"
        paths={ICON_PATHS[iconName]}
        pathStyle={{
          strokeWidth: '.3',
          fill: { iconColor },
          stroke: { iconColor }
        }}
        id="account-menu-icon"
        className="account-page__menu-icon"
        onMouseOver={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      />
    );

    return (
      <div>
        <div className="account-page__menu-nav">
          <div className="account-page__menu-title">My Account</div>
          <div className="account-page__menu">
            <Link to="/me/my-profile" className="account-page__menu-items">
              {accountIcon('user')}
              <span
                className={
                  this.props.currentPage === 'myProfile' ? 'underline-main' : ''
                }
              >
                My Profile
              </span>
            </Link>
            <Link to="/me/order-history" className="account-page__menu-items">
              {accountIcon('history')}
              <span
                className={
                  this.props.currentPage === 'orderHistory' ? 'underline-main' : ''
                }
              >
                Order History
              </span>
            </Link>
            <Link to="/me/address-book" className="account-page__menu-items">
              {accountIcon('address')}
              <span
                className={
                  this.props.currentPage === 'addressBook' ? 'underline-main' : ''
                }
              >
                Address Book
              </span>
            </Link>
            <Link to="/me/payment-details" className="account-page__menu-items">
              {accountIcon('credit-card')}
              <span
                className={
                  this.props.currentPage === 'paymentDetails' ? 'underline-main' : ''
                }
              >
                Payment Details
              </span>
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
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(AccountMenu));
