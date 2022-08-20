const { response } = require('express');

const bcryptjs = require('bcryptjs')
const User = require('../models/users');

const controllerGET = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { status: true }

    if( isNaN(Number(limit)) || isNaN(Number(from)) ){
        return res.status(400).json({
            error: 400,
            msg: "The limit and the from must be a number..."
        })
    }
    
    const [ total, user ] = await Promise.all([

        User.countDocuments(query),
        User.find(query).limit(Number(limit)).skip(Number(from))

    ]) 
    res.json({
        total,
        user
    })
}

const controllerPUT = async(req, res = response) => {
    const { id } = req.params
    const { _id, password, email, google, ...rest } = req.body;

    //?     Saving new password and encrypting...
    if( password ){

        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt )

    }

    const users = await User.findByIdAndUpdate( id, rest );

    res.json({
        msg: "put JSON - controller",
        users
    })
}

const controllerPOST = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const users = new User({name, email, password, role})

    //  Hash Password
    const salt = bcryptjs.genSaltSync();
    users.password = bcryptjs.hashSync( password, salt );

    //  Save in DB
    await users.save()

    res.json({
        msg: "post JSON - controller",
        users
        
    })
}
const controllerDELETE = async(req, res = response) => {

    const { id } = req.params

    const userDeleted = await User.findByIdAndUpdate( id, { status: false } )

    const uid = req.uid
    const userAuth = req.user

    res.json({
        userDeleted,
        uid,
        userAuth
    })
}

const controllerPATCH = (req, res = response) => {
    res.json({
        msg: "patch JSON - controller"
    })
}

module.exports = {
    controllerGET,
    controllerPUT,
    controllerPOST,
    controllerDELETE,
    controllerPATCH

}