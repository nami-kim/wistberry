const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const passport = require('passport');

// @route   GET api/auth/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth Works' }));

module.exports = router;
