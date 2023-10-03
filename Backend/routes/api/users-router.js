//passport sign-in
const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const passport = require('../../config/passport')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');


const router = express.Router()

const validateUser = [//pass as middleware with the correct fields
    check('firstname')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .matches(/^[a-zA-Z]+$/)//just alpha
        .withMessage('Please provide a firstname(min 2 characters).'),
    check('lastname')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .matches(/^[a-zA-Z]+$/)//just alpha
        .withMessage('Please provide a lastname(min 2 characters).'),
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
        .isLength({ min: 1 })
        .withMessage('Please provide user email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Enter a valid password'),
    handleValidationErrors
];



router.post('/login', validateLogin, UserCtrl.loginUser)
router.post('/register', validateUser, UserCtrl.createUser)

router.get('/current', restoreUser, UserCtrl.currentUser)

router.get('/:id', UserCtrl.getUser);
router.get('/', UserCtrl.getAllUsers);
router.put('/:id', UserCtrl.updateUser)
router.delete("/delete/:id", UserCtrl.deleteUserById)


//dunno why im saving this
// router.get(
//     '/',
//     // restoreUser,
//     (req, res) => {
//         const { user } = req;
//         if (user) {
//             return res.json({
//                 user: user.toSafeObject()
//             });
//         } else return res.json({});
//     }
// );


module.exports = router
