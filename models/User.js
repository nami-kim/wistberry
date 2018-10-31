const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  orderHistory: {
    type: Array
  },
  billingInfo: {
    type: Array
  },
  cart: {
    type: Array,
  },
  shippingInfo: {
    type: Array,
  },
});

module.exports = User = mongoose.model('users', UserSchema);
