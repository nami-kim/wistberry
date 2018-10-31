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
      _(req.body)
        .pick(['firstname', 'lastname', 'email', 'password'])
        .merge({
          orderHistory: [],
          shippingInfo: [],
          billingInfo: [],
          cart: []
        })
        .value()
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
            const payload = _.pick(user, ['firstname', 'lastname', 'email']);

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: '60d' },
              (err, token) => {
                // Send User information
                res.send({
                  success: true,
                  token: 'Bearer ' + token,
                  user
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
        const payload = _.pick(req.body, ['firstname', 'lastname', 'email']);
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '100d' },
          (err, token) => {
            res.send({
              user,
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

router.get('/user-exists', (req, res) => {
  const email = decodeURIComponent(req.query.email);

  User.findOne({ email })
    .then(user => {
      let userExist;
      if (user) {
        return res.status(200).send({ userExists: true });
      }

      return res.status(200).send({ userExists: false });
    })
    .catch(err => res.status(400).send(err));
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

// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.send({ id: req.user.id, email: req.user.email });
//   }
// );

// to get all User Detail Info (used for startSetUserDetail in userActions)
router.get('/me', (req, res) => {
  const email = decodeURIComponent(req.query.email);

  User.findOne({ email })
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send('User does not exist');
      }
    })
    .catch(err => res.status(400).send(err));
});

// Update cart in DB (inside users table)
router.post('/me/cart', (req, res) => {
  const { email, cart } = req.body;

  User.findOne({ email })
    .then(user => {
      user.cart = cart;
      user.save();
      res.status(200).send(user);
    })
    .catch(err => res.status(400).send(err));
});

// Overwrite cart in DB (inside users table)
// If user logs in with anything in their cart already, we overwrite the cart in DB with redux state cart
router.post('/me/cart/overwrite', (req, res) => {
  const { email, cart } = req.body;

  User.findOne({ email })
    .then(user => {
      user.cart = cart;
      user.save();
      res.status(200).send(user);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
