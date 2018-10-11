import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { logoutUser } from '../../actions/authActions'

class AccountPage extends Component {
  onLogoutClick = (e) => {
    e.preventDefault(e)
    this.props.logoutUser()
    this.props.history.push('/account/login')
  }
  render() {
    return (
      <div>
        <Header defaultHeader={true} />
        <div className="container account-page">
          <div className="account-page__title">My Account</div>
          <div className="account-page__logout">
            <a href="#" onClick={this.onLogoutClick}>logout</a>
          </div>
          <div className="account-page__order">
            You haven't placed any orders yet.
          </div>

          <div className="customer-profile">
            <div className="customer-profile__name">
              {this.props.auth.user.firstname} {this.props.auth.user.lastname}
            </div>
            <div className="customer-profile__email">
              {this.props.auth.user.email}
            </div>
            <div className="customer-profile__address">
              <p>You haven't added any address yet.</p>
              <p className="customer-profile__address--add">Add an address</p>
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
export default connect(mapStateToProps, { logoutUser })(AccountPage);
