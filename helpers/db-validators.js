const Role = require('../models/roles')
const Users = require('../models/users')
const Category = require('../models/category');
const Product = require('../models/product');
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

// Categories middlewares for validate if exist
const categoryIdExist = async( id ) => {
    if( !mongoose.Types.ObjectId.isValid(id)){
        throw new Error('This is not a valid Mongoose ID');
    }

    const existID = await Category.findById(id);
    if(!existID){
        throw new Error(`Category with ID: ${id} does not exist`);
    }
    
}

// Products middlewares for validate if exist
const productIdExist = async( id ) => {
    if( !mongoose.Types.ObjectId.isValid(id)){
        throw new Error('This is not a valid Mongoose ID');
    }

    const existID = await Product.findById(id);
    if(!existID){
        throw new Error(`Product with ID: ${id} does not exist`);
    }
    
}

//  Validate allowed collections
const allowedCollectionsHelper = (collection = '', collections = []) => {

    const include = collections.includes(collection);

    if(!include){
        throw new Error(`The collection ${collection} is not allowed, ${collections}`);
    }

    return true;

}

module.exports = {
    roleExist,
    validateEmail,
    idExist,
    categoryIdExist,
    productIdExist,
    allowedCollectionsHelper
}