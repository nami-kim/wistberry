const express = require('express');
const router = express.Router();
const stripeKey = require('../../config/keys').stripeSecretKey;
const stripe = require('stripe')(stripeKey);

// Load User Model & validation
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Billing Works' }));

router.post('/stripe/card', async (req, res) => {});
// Creates a stripe customer & Create an order & Charge the order to the customer
router.post('/stripe/charge', async (req, res) => {
  try {
    const user = await User.findOne({ stripeCustomerId: req.body.customerId });
    let customer_id;
    if (user) {
      customer_id = user.stripe_customer_id;
    } else {
      customer = await stripe.customers.create({
        source: req.body.token.id
      });
      customer_id = customer.id;
    }

    const order = await stripe.orders.create(req.body.order);
    const orderResult = await stripe.orders.pay(order.id, {
      customer: customer.id
    });
    res.status(200).send(orderResult);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }

  // stripe.charges
  //   // .create({
  //   //   amount: 15900,
  //   //   currency: 'cad',
  //   //   description: 'zee zee plants',
  //   //   source: req.body.id
  //   // })
  //   .create(req.body.order)

  //   .then(charge => res.send(charge))
  //   .err(err => res.status(500).send(err));
});

module.exports = router;
