//Note, Auth stuff crammed here, could clean up on it's own route, but there isn't much to it.
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();
const { SESSION_SECRET, CLIENT_SECRET, CLIENT_ID } = process.env;
/////
const app = express();
const port = 3000; //
const bodyParser = require('body-parser');
const cors = require('cors')

const commentRouter = require("./routes/api/comments-router");
const usersRouter = require("./routes/api/users-router")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Host');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

//base test route
app.get('/', (req, res) => {//test connection
    res.send('Hello, backend successfully connected!');
});
//Auth Route
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//auth stuff - Google sign-in
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }))
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new GoogleStrategy({
//     clientID: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     scope: ['profile', 'email'],
// },
//     (accessToken, refreshToken, profile, done) => {
//         console.log('done', profile)
//         console.log('TOKEN', accessToken)
//         return done(null, profile);
//     }
// ));
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         // Successful authentication, redirect to the desired route or perform other actions.
//         res.redirect('/');
//     }
// );
// // app.get('/user',
// //     passport.authenticate('google', { scope: ['profile', 'email'] }),
// //     (req, res) => {
// //         console.log('profile')
// //     }

// // );

// passport.serializeUser((user, done) => {
//     // Serialize the user data and store it in the session.
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     // Retrieve the user data from the session.
//     done(null, user);
// });
// ////end auth stuff
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/auth/', usersRouter)


//Comments Route
app.use('/api/comments', commentRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
