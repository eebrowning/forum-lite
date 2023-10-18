const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();
const { SESSION_SECRET, CLIENT_SECRET, CLIENT_ID } = process.env;


const router = express.Router()
//Auth Route
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//auth stuff - Google sign-in
router.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
router.use(passport.initialize());
router.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'],
},
    (accessToken, refreshToken, profile, done) => {

        console.log('XXXXXXXXXXXXXXXXXXX')
        console.log('XXXXXXXXXXXXXXXXXXX')
        console.log('NAME', profile.name.givenName, profile.name.familyName)
        console.log('Google ID', profile.id)
        console.log('TOKEN', accessToken)

        return done(null, profile);
    }
));
router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
    (req, res) => {
        if (req.isAuthenticated()) {
            console.log('successful auth')
        } else {
            console.log('unsuccessful auth')

        }
    }
);

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to the desired route or perform other actions.
        // not sure how to employ this yet.
        res.redirect('/');
    }
);

router.get('/user',
    passport.authenticate('google', { scope: ['profile', 'email'] }),

    (req, res) => {
        console.log('profile')
    }

);

passport.serializeUser((user, done) => {
    // Serialize the user data and store it in the session.
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // Retrieve the user data from the session.
    done(null, user);
});
////end auth stuff
////////////////////////////////////////////////////////////////////////////////
module.exports = router;
