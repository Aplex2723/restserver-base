const { response, json } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleAuth = async( req, res = response ) => {

    const {id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);
        
        let user = await User.findOne({email});
        if(!user) {    
            const data = {
                name, 
                email,
                img: picture,
                role: "USER_ROLE",
                password: "asf",
                google: true,
            } 

            user = new User(data);
            await user.save();
        }
        if(!user.status){
            return res.status(401).json({
                msg: "The user is unable, pleace contact the administrator for more information."
            })
        }

        const token = await generateJWT(user.id);
        res.json({
            user, token
        })
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'Token can\'t be verified'
        })
    }

}

module.exports = {
    controllerAuth,
    googleAuth
}