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
  billingOptions: {
    type: Array
  },
  cart: {
    type: Array
  },

  shippingAddressOptions: [
    {
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      address1: {
        type: String,
        required: true
      },
      address2: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: true
      },
      province: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      phone: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      defaultShippingAddress: Boolean
    }
  ],

  // newsletter: {
  //   type: Boolean
  // }
});

module.exports = User = mongoose.model('users', UserSchema);
