const express = require('express');
const router = express.Router();
const stripeKey = require('../../config/keys').stripeSecretKey;
const stripe = require('stripe')(stripeKey);

router.get('/test', (req, res) => res.json({ msg: 'Order Works' }));

router.post('/stripe', (req, res) => {
  stripe.orders
    .create({
      currency: 'usd', // ?
      items: [
        {
          type: 'sku',
          parent: 'sku_DcT99LUciskeWd' // req.body.sku.id?
        }
      ],
      shipping: {
        name: 'Nami Kim', // req.body.user.id?
        address: {
          line1: '1028 Bak St.', // req.body.user.address ?
          city: 'Vancouver', 
          state: 'BC', 
          country: 'Canada',
          postal_code: 'V6E 0B1'
        }
      },
      email: 'naomi@test.com' // req.body.user.email?
    })
    .then(order => console.log(order))
    .err(err => res.status(400).send(err));
});

module.exports = router;
