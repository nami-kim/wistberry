module.exports = {
  mongoURI: process.env.MONGO_URI,
  mongoCertPath: process.env.MONGODB_CERT_PATH,
  secretOrKey: process.env.SECRET_OR_KEY, // this has to be updated!
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
}
