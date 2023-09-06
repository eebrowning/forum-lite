const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../db/models/user')
const [SECRET] = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = SECRET;


passport.use(
    new BearerStrategy(async (token, done) => {
        // Verify and authenticate the user based on the token
        User.findOne({ token: token });
    })
);
passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log('jwt payload', jwt_payload)
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                // return the user to the frontend
                return done(null, user);
            }
            // return false since there is no user
            return done(null, false);
        })
        .catch(err => console.log(err));
}));



module.exports = passport;






// "Bearer"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGFjNjlhNmYzZGNjZmFhMWEwMzFjZiIsInVzZXJuYW1lIjoiVml2aWVubmUiLCJpYXQiOjE2NzUyODg0OTUsImV4cCI6MTY3NTI5MjA5NX0.r1Gc9zK4-pn2eT2gR6EaY7Ipkxw3sKPwBPIqVgyMC0Q"
