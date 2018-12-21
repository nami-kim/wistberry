import React, { Component } from 'react';
import Icon from './common/Icon';
import { ICON_PATHS } from './common/constants';
import { Link } from 'react-router-dom';
import Header from './Header';

export class FAQPage extends Component {
  state = {};
  toggleOpen = id => {
    const currentId =
      typeof this.state[id] === 'undefined' ? false : this.state[id];
    this.setState(() => ({ [id]: !currentId }));
  };
  render() {
    const QA = ({ id, question, answer }) => (
      <div>
        <div
          className="row pv4 bb b--black-20"
          style={{ cursor: 'pointer' }}
          onClick={() => this.toggleOpen(id)}
        >
          <div className="col-xs-10 col-sm-11">
            <div className="f3">{question}</div>
          </div>
          <div className="col-xs-2 col-sm-1">
            <Icon
              width="16"
              height="16"
              paths={ICON_PATHS['chevron-down']}
              pathStyle={{ strokeWidth: '1', stroke: '#666', fill: '#666' }}
              style={{
                marginTop: '10px',
                transform: this.state[id] ? 'rotate(180deg)' : ''
              }}
            />
          </div>
          {this.state[id] && (
            <div className="col-xs-12 mt3">
              <div className="f4 mid-gray">{answer}</div>
            </div>
          )}
        </div>
      </div>
    );
    const aboutPlants = [
      {
        id: 1,
        question: (
          <div>
            How should I take care of my plant? How much sunlight and water does
            it need?
          </div>
        ),
        answer: (
          <div>
            If you are not a plant expert, that’s alright! We’re here to support
            you every step of your plant journey. Each plant has its own needs
            and detailed care instruction is provided both on our website and
            with the delivery of every plant. When in doubt, remember that it’s
            better to underwater than overwater since overwatering is probably
            the #1 cause of plant death. If you’re really not sure what’s going
            on, give us a shout anytime and we’ll help you out!
          </div>
        )
      },
      {
        id: 2,
        question: <div>What is the right plant for me?</div>,
        answer: (
          <div>
            Are you a first-time plant owner and can’t decide on which plant is
            best for you? No worries - all our plants have been carefully chosen
            for easy care and low maintenance. You really can’t go wrong with
            picking any plant in our “Easy Care” collection.
          </div>
        )
      },
      {
        id: 3,
        question: <div>Are your plants safe for pets?</div>,
        answer: (
          <div>
            The majority of our plants are safe for pets to be around. If you
            are worried about your pets accidentally ingesting the plant, money
            tree, parlor palm, and nest ferns are non-toxic and are safe bets.
          </div>
        )
      },
      {
        id: 4,
        question: <div>What should I do when I receive my potted plant?</div>,
        answer: (
          <div>
            <div className="mb3">
              Unboxing and seeing your beautiful plant is exciting!
            </div>
            <ol className="ml4">
              <li>
                Take the plant out of the box and place it in a brightly lit
                area.
              </li>
              <li>Set the pot in the pot stand.</li>
              <li>
                Dip your finger into the soil and check the soil for water
                level. If the top 2 inches of soil is dry, it’s time to water
                the plant. If the soil is still damp or wet, no need to water it
                - just enjoy the beauty!
              </li>
            </ol>
          </div>
        )
      },
      {
        id: 5,
        question: <div>What do I do if something happens to my plant?</div>,
        answer: (
          <div>
            All of our plants come with detailed, foolproof care instructions
            that you can follow along to ensure your plant is healthy and lively
            for years. In the event that your plant does not look like it is
            doing too well, it is important to see if you have over watered it -
            you can lift the plant from the pot and see if the roots are turning
            yellow and if it is, it means it’s rotting from overwatering. If
            ever in doubt, please get in contact with us at help@wistberry.com.
          </div>
        )
      },
      {
        id: 6,
        question: (
          <div>
            Why does my potted plant look different compared to the one on the
            website?
          </div>
        ),
        answer: (
          <div>
            There are no two plants that are identical, so the look might be
            slightly different. But all our plants should look healthy and
            stylish! For whatever reason you’re not happy with it, please let us
            know immediately and we’ll look into it for you.
          </div>
        )
      },
      {
        id: 7,
        question: <div>How long can I expect my plant to last?</div>,
        answer: (
          <div>
            Years! But only if you take good care of it. We make it easy for you
            to do that, but a little bit of love and attention goes a long way.
            :)
          </div>
        )
      }
    ];
    const orderDelivery = [
      {
        id: 8,
        question: <div>What if I need to change or cancel my order?</div>,
        answer: (
          <div>
            No problem! Just give us a shout and we’ll be able to help you with
            that.
          </div>
        )
      },
      {
        id: 9,
        question: <div>What if I need to change my shipping address?</div>,
        answer: (
          <div>
            You can change your shipping address by sending us an email at
            help@wistberry.com and we will do our best to change your shipping
            address as soon as possible.
          </div>
        )
      },
      {
        id: 10,
        question: <div>What payment methods are available?</div>,
        answer: (
          <div>We currently accept Visa, Mastercard, and American Express.</div>
        )
      },
      {
        id: 11,
        question: <div>Can I order this for someone else?</div>,
        answer: (
          <div>
            Yes absolutely! Receiving potted plants as gifts are sure to bring a
            smile to anyone’s face. We can also help you deliver a special
            message to the recipient.
          </div>
        )
      },
      {
        id: 12,
        question: <div>Where do you deliver to?</div>,
        answer: (
          <div>
            We currently only service the Greater Vancouver area, however, we
            are planning on expanding to be available Canada wide in the near
            future!
          </div>
        )
      },
      {
        id: 13,
        question: <div>What can I expect in my delivery package?</div>,
        answer: (
          <div>
            <div className="mb3">
              In your package you should expect the following:
            </div>
            <ul className="ml4">
              <li>A beautiful plant</li>
              <li>Premium Wistberry Pot</li>
              <li>Premium Wistberry handcrafted pot stand</li>
              <li>Detailed care instructions</li>
            </ul>
          </div>
        )
      },
      {
        id: 14,
        question: <div>When can I expect my order?</div>,
        answer: (
          <div>
            We are able to deliver your order to your door within 2 business
            days!
          </div>
        )
      }
    ];
    const warrantyReturns = [
      {
        id: 15,
        question: <div>What is your 30-day guarantee all about?</div>,
        answer: (
          <div>
            All of the potted plants we offer are designed to be easy to take
            care of and come with care instructions that are very easy to follow
            along to. In the event that your plant dies within the first 30
            days, we will replace your plant, no questions asked!
          </div>
        )
      },
      {
        id: 16,
        question: <div>What is your return policy</div>,
        answer: (
          <div>
            We accept returns up to 7 days after the date of receipt. We are
            confident that you will like our product that we will take the
            product back at our expense. It’s our money back guarantee to you!
          </div>
        )
      }
    ];
    return (
      <div className="f3">
        <Header productHeader={true} />

        {/* hero: #e97373 */}
        <div className="container-wide" style={{ marginTop: '12rem' }}>
          <div className="row relative">
            <div className="col-xs-12 col-md-4 col-lg-6">
              <h1 className="f-headline lh-solid fw5">FAQ</h1>
              <div
                className="absolute"
                style={{
                  zIndex: '-2',
                  top: '200px',
                  left: '-60px',
                  transform: 'rotate(30deg)',
                  opacity: '0.4'
                }}
              >
                <img
                  src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/leaf-3.png"
                  style={{ width: '200px' }}
                />
              </div>
              <div
                className="absolute"
                style={{
                  zIndex: '-2',
                  bottom: '200px',
                  left: '-60px',
                  transform: 'rotate(120deg)',
                  opacity: '0.3'
                }}
              >
                <img
                  src="https://s3-us-west-2.amazonaws.com/wistberry/images/test/leaf-4.png"
                  style={{ width: '220px' }}
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
              <div className="f2 bold mt5 mb3">About the Plant</div>
              {aboutPlants.map(({ id, question, answer }) => (
                <QA question={question} answer={answer} id={id} key={id} />
              ))}
              <div className="f2 bold mt5 mb3">Order and Delivery</div>
              {orderDelivery.map(({ id, question, answer }) => (
                <QA question={question} answer={answer} id={id} key={id} />
              ))}
              <div className="f2 bold mt5 mb3">Warranty and Returns</div>
              {warrantyReturns.map(({ id, question, answer }) => (
                <QA question={question} answer={answer} id={id} key={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FAQPage;
