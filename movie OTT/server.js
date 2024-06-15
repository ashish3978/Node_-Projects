require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Replace with your MongoDB URI
const mongoURI = 'mongodb://localhost:27017/google-auth';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  username: String,
  googleIdNumber: String,
  phoneNumber: String, // Add the phone number field
});

const User = mongoose.model('User', UserSchema);

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Ensure SESSION_SECRET is loaded from the environment
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const googleIdNumber = googleId.replace(/\D/g, ''); // Extract numeric part of Google ID

        let phoneNumber = null;
        try {
          const response = await axios.get(
            'https://people.googleapis.com/v1/people/me?personFields=phoneNumbers',
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (response.data.phoneNumbers && response.data.phoneNumbers.length > 0) {
            phoneNumber = response.data.phoneNumbers[0].value;
          }
        } catch (error) {
          console.error('Error fetching phone number from Google People API:', error);
        }

        const existingUser = await User.findOne({ googleId: googleId });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: googleId,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
          googleIdNumber: googleIdNumber,
          phoneNumber: phoneNumber, // Set phone number
        });

        const user = await newUser.save();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

app.set('view engine', 'ejs');

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
    ],
  })
);

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('profile', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
