const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripeKey = require('../../config/keys').stripeSecretKey;
const stripe = require('stripe')(stripeKey);

// @route   GET api/products/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));

router.get('/', (req, res) => {
  const errors = {};
  stripe.products
    .list()
    .then(products => {
      if (!products) {
        errors.noproduct = 'There is no product';
        return res.status(404).json(errors);
      }
      res.json(products.data);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
