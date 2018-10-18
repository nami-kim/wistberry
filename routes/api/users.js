const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const _ = require('lodash');

// Load User Model & validation
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validatePasswordForgotInput = require('../../validation/password-forgot');

router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).send(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'This email address is already in use.';
      return res.status(400).send(errors);
    }
    const newUser = new User(
      _.pick(req.body, ['firstname', 'lastname', 'email', 'password'])
    );

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          // .then(user => res.send(user)) this was original done by Brad
          .then(user => {
            // Create JWT payload
            const payload = {
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname
            };
            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: '60d' },
              (err, token) => {
                // Send User information
                res.send({
                  success: true,
                  user,
                  token: 'Bearer ' + token
                });
              }
            );
          })
          .catch(err => res.status(400).send(err));
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).send(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'This user does not exist.';
      return res.status(404).send(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        // Create JWT payload
        const payload = {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname
        };
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '100d' },
          (err, token) => {
            res.send({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password =
          'The password you entered is incorrect. Try again, or reset your password.';
        return res.status(400).send(errors);
      }
    });
  });
});


router.get('/users', (req, res) => {
  const email = decodeURIComponent(req.body.query.email);

  User.findOne({ email }).then(user => {
    if (user) {
      errors.message = `${req.body.query} already registered.`;
      return res.status(404).send(errors);
    }
  });
});

router.post('/reset-password', (req, res) => {
  const { errors, isValid } = validatePasswordForgotInput(req.body);
  if (!isValid) return res.status(400).send(errors);

  const email = req.body.email;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'This user does not exist.';
      return res.status(404).send(errors);
    }
    // Reset password
    // Send an email
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send({ id: req.user.id, email: req.user.email });
  }
);

module.exports = router;
