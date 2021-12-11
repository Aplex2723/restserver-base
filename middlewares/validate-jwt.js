const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/users')

const validateJWT = async(req = request, res = response, next ) => {

    const token = req.header('apikey')

    if( !token ){
        return res.status(401).json({
            error: 'You need a API Token'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        req.uid = uid

        const user = await User.findById( uid )
        
        //? Checking if the user exist
        if( !user ){
            return res.status(401).json({
                msg: "The token doesn't exist..."
            })
        }

        //? Checking if the user is disabled
        if( !user.status ){
            return res.status(401).json({
                msg: "Invalid Token, token delated..."
            })
        }
        req.user = user

        next()
        
    } catch (error) {

        console.log(error)
        res.status(401).json({
            error: "Invalid Token"
        })
        
    }

}

module.exports = {
    validateJWT
}