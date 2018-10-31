import React, { Component } from 'react';
import AccountMenu from './AccountMenu';
import Header from '../Header';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { browserHistory } from 'react-router';
import SignupForm from '../auth/SignupForm';
import { Link } from 'react-router-dom';

class AccountPage extends Component {
  state = {
    editInUse: false
  };
  onBackBtn = () => {
    this.props.history.goBack();
  };
  toggleEditInUse = () =>
    this.setState(() => ({ editInUse: !this.state.editInUse }));

  render() {
    const { firstname, lastname , email } = this.props.user
    return (
      <div>
        <Header defaultHeader={true} />
        <div className="container account-page">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <AccountMenu />
            </div>

            <div className="col-xs-12 col-md-8 hide-on-mobile">
              <div className="account-page__details">
                {!this.state.editInUse && (
                  <div>
                    <div className="account-page__top-icons">
                      <span className="account-page__back-icon hide-on-desktop">
                        <Icon
                          width="30"
                          height="30"
                          paths={ICON_PATHS['arrow-left-circle']}
                          pathStyle={{
                            strokeWidth: '.4',
                            fill: '#2a73cc',
                            stroke: '#2a73cc'
                          }}
                          onClick={this.onBackBtn}
                        />
                      </span>
                      
                    </div>

                    <div className="account-page__title">My Profile</div>

                    <div className="account-page__body">
                      <div
                        className="account-page__edit-icon"
                        onClick={this.toggleEditInUse}
                      >
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
                      </div>
                      <div className="account-page__profile">
                        <div className="profile-item row">
                          <span className="profile-item__title col-xs-5 col-md-4">
                            Name
                          </span>
                          <span className="profile-item__field col-xs-7 com-md-8">
                           {firstname} {lastname}
                          </span>
                        </div>
                        <div className="profile-item row">
                          <span className="profile-item__title col-xs-5 col-md-4">
                            Email
                          </span>
                          <span className="profile-item__field col-xs-7 col-md-8">
                            {email}
                          </span>
                        </div>
                        <div className="profile-item row">
                          <span className="profile-item__title col-xs-5 col-md-4">
                            Password
                          </span>
                          <span className="profile-item__field col-xs-7 col-md-8">
                            <Icon
                              width="25"
                              height="25"
                              paths={ICON_PATHS['lock']}
                              pathStyle={{
                                strokeWidth: '.3',
                                fill: 'black',
                                stroke: 'black'
                              }}
                              style={{ display: 'block', marginLeft: '-.8rem' }}
                            />
                            <span
                              style={{
                                display: 'block',
                                marginBottom: '-.7rem'
                              }}
                            >
                              **********
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.editInUse && (
                  <div>
                    <div className="account-page__title">My Profile</div>
                    <div className="account-page__signup-form">
                      <SignupForm type="update">Update</SignupForm>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
