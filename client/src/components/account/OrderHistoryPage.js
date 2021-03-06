import React, { Component } from 'react';
import AccountMenu from './AccountMenu';
import Header from '../Header';
import Icon from '../common/Icon';
import { ICON_PATHS } from '../common/constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class OrderHistoryPage extends Component {
  state = {
    orders: ['123', '456']
  };
  render() {
    const { orderHistory } = this.props.user;
    
    return (
      <div>
        <Header defaultHeader={true} />
        <div className="container account-page">
          <div className="row">
            <div className="col-xs-12 col-md-4 hide-on-mobile">
              <AccountMenu currentPage="orderHistory" />
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
                <div className="account-page__title">Order History</div>
                <div className="account-page__body">
                  <div className="account-page__edit-icon">
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
                  <div className="account-page__order-history">
                    {orderHistory ? 'Update this!!' : 'You have not yet ordered.'}
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

export default connect(mapStateToProps)(OrderHistoryPage);
