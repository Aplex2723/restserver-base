const { response } = require("express");
const Product = require("../models/product")

//  Function to save the product
const productPOST = async( req, res = response ) => {
    const { state, user, ...data } = req.body;

    const name = req.body.name.toUpperCase();

    const productDB = await Product.findOne({ name });
    
    if( productDB ) {
        return res.status(400).json({
            msg: `The product ${productDB.name} alredy exist`
        })
    }
    
    const newdata = {
        ...data,
        name,
        user: req.user._id
    }
    
    const newProduct = new Product(newdata);
    await newProduct.save();

    res.status(201).json({
        succes: `Product ${name} upload successfully`,
    })
}

//  Function to get all the products available on the DB
const productsGET = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    if( isNaN(Number(limit)) || isNaN(Number(from)) ){
        return res.status(400).json({
            error: 400,
            msg: "The LIMIT and the FROM must be a number..."
        })
    }
    
    const [ total, product ] = await Promise.all([

        Product.countDocuments(query),
        Product.find(query).populate('user', 'name').populate('category', 'name').limit(Number(limit)).skip(Number(from)),

    ]) 
    res.json({
        total,
       product 
    })
}

//  Function to get a product form the ID
const productGET = async(req, res = response ) => {
    const { id } = req.params;
    
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');
    
    res.status(201).json({ 
        product
    })
}

//  Function to update a product from the ID
const productPUT = async( req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data} = req.body;

    let name;
    if(data.name){name = data.name.toUpperCase();}

    const newData = {
        ...data,
        name,
        user: req.user._id
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, newData, {new: true});

    res.status(201).json({
        msg: "Update Successful",
        updatedProduct
    })

}

//  Function to delete the product (put the state in false)
const productDELETE = async(req, res = response ) => {

    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndUpdate(id, { state: false }, { new: true });
    res.status(201).json({
        msg: "Delete Successful",
        deletedProduct
    })
}

module.exports = {
    productPOST,
    productsGET,
    productGET,
    productPUT,
    productDELETE

}