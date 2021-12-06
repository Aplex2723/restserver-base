const { validationResult } = require('express-validator')

//*     Middleware to validate POST data

const validateFields = ( req, res, next ) => {

    //! Validate email with express-validator
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }

    next()
    
}

module.exports = {
    validateFields
} 