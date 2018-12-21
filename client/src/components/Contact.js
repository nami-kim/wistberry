import React, { Component } from 'react';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { Link } from 'react-router-dom';
import Header from './Header';

export class FAQPage extends Component {
  render() {
    return (
      <div className="f3">
        <Header productHeader={true} />

        {/* hero: #e97373 */}
        <div className="container-wide" style={{ marginTop: '12rem' }}>
          <div className="row relative">
            <div className="col-xs-12 col-md-4 col-lg-6">
              <h1 className="f-headline lh-solid fw5">Need help?</h1>
              <div>
                <div className="f2 bold mb3">Give us a shout anytime.</div>
                <div className="mb3">
                  Have any question about your plants? Your Order?
                </div>
                <div className="mb3">Feel free to reach out to us:</div>
                <div className="mb3 mid-gray">help@wistberry.com</div>
              </div>
              <div
                className="absolute"
                style={{
                  zIndex: '-2',
                  top: '240px',
                  left: '-20px',
                  transform: 'rotate(40deg)',
                  opacity: '0.2'
                }}
              >
                <img
                  src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/leaf-1.png"
                  style={{ width: '200px' }}
                />
              </div>
            </div>
            <div className="col-xs-12 col-md-8 col-lg-6 relative">
              <div
                className="absolute"
                style={{
                  top: '0',
                  right: '-2rem',
                  left: '-2rem',
                  bottom: '0',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  zIndex: '-1'
                }}
              />
              <div className="aspect-ratio aspect-ratio--4x3 overflow-hidden shadow-1 mb5 mt5">
                <div
                  className="aspect-ratio--object"
                  style={{
                    background:
                      'url("https://s3-us-west-2.amazonaws.com/wistberry/images/test/interior-design-7.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FAQPage;
