const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('../../db/models/user');
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
    callbackURL: '/auth/google/callback',//learn more about this
    scope: ['profile', 'email'],//probably don't need to be keyinginto profile.emails if email is already here...
},
    (accessToken, refreshToken, profile, done) => {
        if (!profile.name) console.log('must not be logged in: no Profile name');

        User.findOne({ googleId: profile.id })//search for currently registered user
            .then(user => {

                if (!user) {
                    //make sure user doesn't already exist with google email, update with googleId if they do:
                    User.findOne({ email: profile.emails[0].value })
                        .then((retry) => {
                            if (retry && profile.emails[0].value === retry.email) {
                                //if the user's email already registered, associate their googleId here:
                                retry.googleId = profile.id;
                                retry.save();
                                // console.log(retry, 'user updated')
                                //TODO: this is not certain:
                                return retry;
                            } else {
                                // Otherwise create a new user with the google info:
                                const newUser = new User({
                                    firstname: profile.name.givenName,
                                    lastname: profile.name.familyName,
                                    email: profile.emails[0].value,
                                    googleId: profile.id
                                })
                                newUser.save()
                            }
                        })
                }
                else if (user && profile.id === user.googleId) {
                    //log them in
                    // console.log(user, profile, 'user')
                    return user;
                }
                else {
                    // Otherwise create a new user
                    console.log('Should never get here')
                }
            })

        return done(null, profile);
    }
));



router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
    (req, res) => {
        console.log(res.body(), 'google base route');

        // return res.body();
        return res.json({
            user: {
                firstname: res.req.user.name.givenName,
                lastname: res.req.user.name.familyName,
                email: res.req.user.emails[0].value,
            },
            // token: accessToken,
            status: 200
        })
    }
);

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to the desired route or perform other actions.
        // not sure how to properly employ this yet...
        console.log(res.req.user, 'callback');

        res.redirect('/');
        // return res.req.user;
        // return res.json({
        //     user: {
        //         firstname: res.req.user.name.givenName,
        //         lastname: res.req.user.name.familyName,
        //         email: res.req.user.emails[0].value,
        //     },
        //     token: accessToken,
        //     status: 200
        // })
    }
);


//TODO: figure out later
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



/*
Google Profile structure
profile {
    id: '123456712345671234567',
    displayName: 'Ethan Browning',
    name: { familyName: 'Browning', givenName: 'Ethan' },
    emails: [ { value: 'eebrowning828@gmail.com', verified: true } ],
    photos: [
      {
        value: 'https://lh3.googleusercontent.com/a/ACg8ocKYl6cboxOHCHtLGvzPNjnhMK82ekY55s79IoE9pEDTqic=s96-c'
      }
    ],
    provider: 'google',
    _raw: '{\n' +
      '  "sub": "123456712345671234567",\n' +
      '  "name": "Ethan Browning",\n' +
      '  "given_name": "Ethan",\n' +
      '  "family_name": "Browning",\n' +
      '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocKYl6cboxOHCHtLGvzPNjnhMK82ekY55s79IoE9pEDTqic\\u003ds96-c",\n' +
      '  "email": "eebrowning828@gmail.com",\n' +
      '  "email_verified": true,\n' +
      '  "locale": "en"\n' +
      '}',
    _json: {
      sub: '123456712345671234567',
      name: 'Ethan Browning',
      given_name: 'Ethan',
      family_name: 'Browning',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocKYl6cboxOHCHtLGvzPNjnhMK82ekY55s79IoE9pEDTqic=s96-c',
      email: 'eebrowning828@gmail.com',
      email_verified: true,
      locale: 'en'
    }
  }

        // console.log('XXXXXXXXXXXXXXXXXXX')
        // console.log('XXXXXXXXXXXXXXXXXXX')
        // console.log('NAME', profile.name.givenName, profile.name.familyName)
        // console.log('Google ID', profile.id)
        // console.log('TOKEN', accessToken)



*/
