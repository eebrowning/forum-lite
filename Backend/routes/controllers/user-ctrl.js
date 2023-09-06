const User = require('../../db/models/user');
const bcrypt = require('bcryptjs');
const [SECRET] = require('../../config/keys');
const jwt = require('jsonwebtoken');
const { setTokenCookie, restoreUser } = require('../../utils/auth');


loginUser = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                console.log('no user with email:', email)
                return res.json({
                    error: 'Please provide valid email',
                    status: 404
                });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email };
                        let token = setTokenCookie(res, payload);
                        res.json({ token, payload })
                    } else {
                        res.status = 400;

                        return res.json({
                            error: 'Incorrect password',
                            status: 400
                        });
                    }
                })


        })

}

currentUser = (req, res) => {
    // restoreUser;
    // console.log(req)
    // console.log(req., 'user')

    console.log(req.headers.authorization, "in current")
    token = req.headers.authorization;//bearer token for auth
    // console.log(passport.authenticate('bearer', { session: false }))
    // passport.authenticate('bearer', { session: false })

    // restoreUser

    return res.json();
    // return res.json({
    //     id: req.user.id,
    //     firstname: req.user.firstname,
    //     lastname: req.user.lastname,
    //     email: req.user.email
    // });
}


createUser = (req, res) => {
    if (req.errors) {
        console.log('check .errors', req.errors)

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

    let users = await User.find({}, '_id firstname lastname');

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
