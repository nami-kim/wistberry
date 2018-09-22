const express = require('express');
const router = express.Router();
const stripeKey = require('../../configkeys/keys').stripeSecretKey;
const stripe = require('stripe')(stripeKey);

router.get('/test', (req, res) => res.json({ msg: 'Billing Works' }));

router.post('/stripe', (req, res) => {
  stripe.charges
    .create({
      amount: 15900,
      currency: 'cad',
      description: 'zee zee plants',
      source: req.body.id
    })
    .then(charge => console.log(charge))
    .err(err => res.status(400).send(err))
});

module.exports = router;
