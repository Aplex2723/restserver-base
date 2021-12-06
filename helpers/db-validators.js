const Role = require('../models/roles')
const Users = require('../models/users')
const mongoose = require('mongoose')

const roleExist = async( role = '' ) => {
    const roleExist = await Role.findOne({ role })

    if( !roleExist ) {
        throw new Error(`The role ${role} doesn't exist`)
    }
}

// Validating id
const idExist = async( id ) => {

    //? Cheking if the id is valid
    if( !mongoose.Types.ObjectId.isValid(id) ){
        throw new Error(`This isn't a valid Mongoose ID`)
    }

    const existId = await Users.findById(id)

    if( !existId ) {
        throw new Error(`ID: ${id} doesn't exist`)
    }
}

//  Validate Email
const validateEmail = async( email ) =>{
    
    const emailExist = await Users.findOne({ email })
    if( emailExist ){
        
        throw new Error(`Email ${email} already exist`)
       
    }
}


module.exports = {
    roleExist,
    validateEmail,
    idExist,
}