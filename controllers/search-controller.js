const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Category = require('../models/category')
const User = require('../models/users')
const Product = require('../models/product')

const validCollections = [
    'users',
    'category',
    'products',
    'role'
]

const searchUser = async(term, res) => {
    
    //  Cheking if the param is a ID
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const user = await User.findById( term );
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }

    const regexp = new RegExp( term, 'i' ); // Transform the term to an inrregular expression

    const users = await User.find({ 
        $or: [{name: regexp}, {email: regexp}],
        $and: [{ state: true }]
     });
    
    const totalSearch = await User.count({ 
        $or: [{name: regexp}, {email: regexp}],
        $and: [{ state: true }]
     });
    res.json({
        total: totalSearch,
        result: users
    })
}

const searchCategory = async(term, res) => {

    //  Cheking if the param is a ID
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const category = await Category.findById( term );
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regexp = new RegExp( term, 'i' ); // Transform the term to an inrregular expression

    const categories = await Category.find({ 
        $or: [{name: regexp}],
        $and: [{ state: true }]
     });
    
    const totalSearch = await Category.count({ 
        $or: [{name: regexp}],
        $and: [{ state: true }]
     });
    res.json({
        total: totalSearch,
        result: categories
    })
}

const searchProduct = async(term, res) => {

    //  Cheking if the param is a ID
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const product = await Product.findById( term );
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }


    const regexp = new RegExp( term, 'i' ); // Transform the term to an inrregular expression

    const products = await Product.find({ 
        $or: [{name: regexp}, {description: regexp}],
        $and: [{ state: true }]
     });
    
    const totalSearch = await Product.count({ 
        $or: [{name: regexp}, {description: regexp}],
        $and: [{ state: true }]
     });
    res.json({
        total: totalSearch,
        result: products 
    })
}

const searchGET = async(req, res = response) => {
    const { collection, term } = req.params;

    if(!validCollections.includes(collection)){
        return res.status(400).json({
            msg: `The available collections are: ${validCollections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;

        case 'category':
            searchCategory(term, res);
            break;
        
        case 'products':
            searchProduct(term, res);
            break;
    
        default:
            res.status(500).json({
                error: `Fail to catch the collection ${collection}`
            })

            break;
    }
}

module.exports = {
    searchGET
}