const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripeKey = require('../../config/keys').stripeSecretKey;
const stripe = require('stripe')(stripeKey);

router.get('/test', (req, res) => res.json({ msg: 'SKU Works' }));

router.get('/stripe', (req, res) => {
  const errors = {};
  stripe.skus
    .list({limit: 100})
    .then(skus => {
      if (!skus) {
        errors.nosku = 'There is no product';
        return res.status(404).json(errors);
      }
      res.json(skus.data);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
