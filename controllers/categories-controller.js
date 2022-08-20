const { response } = require("express");
const { Category } = require("../models")

const categoryPOST = async( req, res = response ) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if( categoryDB ) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} alredy exist`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const newCategory = new Category(data);
    await newCategory.save();
}

const categoryGET = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    if( isNaN(Number(limit)) || isNaN(Number(from)) ){
        return res.status(400).json({
            error: 400,
            msg: "The LIMIT and the FROM must be a number..."
        })
    }
    
    const [ total, category ] = await Promise.all([

        Category.countDocuments(query),
        Category.find(query).populate('user', 'name').limit(Number(limit)).skip(Number(from)),

    ]) 
    res.json({
        total,
        category
    })
}

const categoryGETByID = async(req, res = response ) => {
    const { id } = req.params;
    
    const category = await Category.findById(id).populate('user', 'name');
    
    res.status(201).json({ 
        category
    })
}

const categoryPUT = async( req, res = response) => {
    const { id } = req.params;
    const { state } = req.body;
    const name = req.body.name.toUpperCase();

    const newData = {
        name,
        state,
        user: req.user._id
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, newData, {new: true});

    res.status(201).json({
        msg: "Update Successful",
        updatedCategory
    })

}

const categoryDELETE = async(req, res = response ) => {

    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndUpdate(id, { state: false }, { new: true });
    res.status(201).json({
        msg: "Delete Successful",
        deletedCategory
    })
}

module.exports = {
    createCategory: categoryPOST,
    categoryGET,
    categoryGETByID,
    categoryPUT,
    categoryDELETE

}