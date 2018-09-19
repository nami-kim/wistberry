const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport')
const path = require('path');

const products = require('./routes/api/products');
const billing = require('./routes/api/billing');
const order = require('./routes/api/order');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/products', products);
app.use('/api/billing', billing);
app.use('/api/order', order);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Any routes that gets hit here(above), we're loading into react html file
  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
