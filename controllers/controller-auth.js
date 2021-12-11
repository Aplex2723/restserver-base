const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');

const controllerAuth = async( req, res = response ) => {

    try {

        const { email, password } = req.body
    
        const user = await User.findOne({ email })
        console.log(user)
    
        // eMail validation
        if( !user ){
            return res.status(400).json({
                msg: 'Incorrect Email/Password  -   email'
            })
        }
    
        // Status validation
        if( !user.status ){
            return res.status(400).json({
                msg: 'Incorrect Email/Password  -   status: false'
            })
        }
    
        // Password validation
        const validPassword = bcrypt.compareSync( password, user.password )
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Incorrect Email/Password  -   password'
            })

        }
    
        // Generate JWT
        const token = await generateJWT( user.id )
    
    
        res.json({
            user,
            token
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: 'Something went wrong, pleace contact the administrator'
        })
        
    }
}

module.exports = {
    controllerAuth
}