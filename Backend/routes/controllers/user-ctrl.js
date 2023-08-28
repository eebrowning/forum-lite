const User = require('../../db/models/user');
const bcrypt = require('bcryptjs');
const [SECRET] = require('../../config/keys');

const jwt = require('jsonwebtoken');
const { setTokenCookie } = require('../../utils/auth')


loginUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then(user => {
            if (!user) {
                console.log('no user', username)
                return res.json({
                    error: 'Please provide valid username',
                    status: 404
                });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username, email: user.email };
                        // console.log(payload.username, 'signing in')
                        jwt.sign(
                            payload,
                            SECRET,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {

                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                    user: payload,
                                });
                            });
                    } else {
                        // return res.status(400).json({ password: 'Incorrect password' });
                        res.status = 400;
                        // res.errors = {
                        //     field: 'password',
                        //     error: 'Incorrect password'
                        // }
                        return res.json({
                            error: 'Incorrect password',
                            status: 400
                        });

                    }
                })


        })

}

currentUser = (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    });
}


createUser = (req, res) => {
    if (req.errors) {
        return res.status(400).json({
            success: false,
            "errors": req.errors
        })
    }
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                // return res.status(400).json({ email: "A user has already registered with this address" })
                return res.status(400).json({
                    success: false,
                    "errors": [{ msg: "A user has already registered with this address" }]
                })


            } else {
                // Otherwise create a new user
                const newUser = new User({
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = { id: user.id, handle: user.handle };

                                jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token,
                                        user: user
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });

            }
        })
}

getUser = async (req, res) => {

    let user = await User.findOne({ _id: req.params.id })
    // console.log(user, 'users in getuser')

    try {
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }

}

getAllUsers = async (req, res) => {

    // let users = await User.find({});

    let users = await User.find({}, '_id username');

    try {
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}



updateUser = async (req, res) => {
    //need to figure out how to check unique email here....
    // User.findOne({ email: req.body.email })
    //     .then(user => {
    //         if (user) {
    //             // Throw a 400 error if the email address already exists
    //             return res.status(400).json({ email: "A user has already registered with this address" })
    //         }
    //         // else {
    //     });

    let body = req.body;
    // console.log(req.params, 'user id')
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'user not found!',
            })
        }
        user.username = body.username
        user.email = body.email
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user.save()
                    // .then(user => res.json(user))
                    .catch(err => console.log(err));
            })
        })
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })

}



deleteUserById = async (req, res) => {

    let deleted = await User.findOneAndDelete({ _id: req.params.id })

    try {
        res.status(200).json({
            success: true,
            data: deleted
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }

}


module.exports = {
    loginUser,
    createUser,
    currentUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUserById
}
