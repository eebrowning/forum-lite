//passport sign-in
const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const passport = require('passport')
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
// const { restoreUser } = require('../../utils/auth');

const router = express.Router()

const validateUser = [//pass as middleware with the correct fields
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username(min 4 characters).'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Enter a valid password, min 6 characters'),
    handleValidationErrors
];
const validateLogin = [//pass as middleware with the correct fields
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Enter a valid password'),
    handleValidationErrors
];

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        msg: 'this is the current user'
    });
})
// router.get('/current', passport.authenticate('jwt', { session: false }), UserCtrl.currentUser);

router.post('/login', validateLogin, UserCtrl.loginUser)
router.post('/register', validateUser, UserCtrl.createUser)
router.get('/:id', UserCtrl.getUser);
router.get('/', UserCtrl.getAllUsers);
router.put('/:id', UserCtrl.updateUser)
router.delete("/:id", UserCtrl.deleteUserById)

router.get(
    '/',
    // restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);


module.exports = router
