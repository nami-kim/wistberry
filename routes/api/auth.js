const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const _ = require('lodash');
const Joi = require('joi');

router.get('/test', (req, res) => res.json({ msg: 'Auth works' }));

// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email']
//   })
// );

// router.get('/google/callback', passport.authenticate('google'));


module.exports = router;
