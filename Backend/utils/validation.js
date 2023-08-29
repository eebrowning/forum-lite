const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {


        console.log(validationErrors.errors, '***in handle validations***')
        req.errors = validationErrors.errors;
        next();

    }
    else {
        next();
    }

};

module.exports = {
    handleValidationErrors
};
