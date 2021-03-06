const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');

const path = require('path');
const products = require('./routes/api/products');
const skus = require('./routes/api/skus');
const billing = require('./routes/api/billing');
const order = require('./routes/api/order');
const users = require('./routes/api/users');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
console.log('db', db)

// Connect to MongoDB
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    db,
    {
      ssl: true,
      sslValidate: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middlware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/products', products);
app.use('/api/skus', skus);
app.use('/api/billing', billing);
app.use('/api/order', order);
app.use('/api/users', users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // app.use(express.static(path.resolve(__dirname, 'client', 'build')))
  // Any routes that gets hit here(above), we're loading into react html file
  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
