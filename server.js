const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport')

const products = require('./routes/api/products');

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

// Passport Middleware
// require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
