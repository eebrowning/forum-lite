const jwt = require('jsonwebtoken');
// const passport = require('../config/passport');
const { User } = require('../db/models/user');
// const { secret, expiresIn } = passport;
const [SECRET] = require('../config/keys');



const setTokenCookie = (res, user) => {
    // Create the token.
    // console.log(user, 'user in set Token ')
    const token = jwt.sign(
        { data: user },
        SECRET,
        { expiresIn: parseInt(3600) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";
    // Set the token cookie
    res.cookie('token', token, {
        maxAge: 3600 * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });
    // console.log(res, 'res in settoken')
    return res;
    // return token;
};

const restoreUser = (req, res, next) => {
    // const { token } = req.cookies;
    // token parsed from cookies wasn't working for some reason, but this does:
    const token = req.headers.authorization.slice(7);//ugly workaround to maintain appropriate 'Bearer xxtokenxx' format

    return jwt.verify(token, SECRET, null, async (err, jwtPayload) => {
        console.log(jwtPayload, 'user found')
        if (err) {
            console.log(err)
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = [
    // restoreUser,
    function (req, _res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
