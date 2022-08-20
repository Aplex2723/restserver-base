const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET 
});

const { response } = require("express");
const { uploadFileHelper } = require("../helpers/upload-file");
const User = require('../models/users')
const Product = require('../models/product')

const uploadFile = async(req, res = response) => {

    try {
        // const fileName = await uploadFileHelper(req.files, ['txt', 'md'], 'textos');
        const fileName = await uploadFileHelper(req.files, undefined, 'imgs');
        res.json({
            name: fileName
        })
    } catch (error) {
        res.status(400).json({error})
    }

}

const updateImage = async(req, res = response) => {
    const {collection, id} = req.params

    let model;
    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if(!model){ 
                return res.status(400).json({ msg: `The user with id ${id} do not exist`})
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model){ 
                return res.status(400).json({ msg: `The product with id ${id} do not exist`})
            }
            break;
    
        default:
            return res.status(500).json({msg:'Invalid route, contact me'})
            break;
    }

    if(model.img){
        const imagPath = path.join(__dirname, '../uploads', collection, model.img);
        if(fs.existsSync(imagPath)){
            fs.unlinkSync(imagPath);
        }
    }

    const name = await uploadFileHelper(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json( model )

}

const updateImageCloudinary = async(req, res = response) => {
    const {collection, id} = req.params

    let model;
    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if(!model){ 
                return res.status(400).json({ msg: `The user with id ${id} do not exist`})
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model){ 
                return res.status(400).json({ msg: `The product with id ${id} do not exist`})
            }
            break;
    
        default:
            return res.status(500).json({msg:'Invalid route, contact me'})
            break;
    }

    if(model.img){
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.')

        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.file
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    model.img = secure_url;

    await model.save();

    res.json(model)

}

const showImages = async(req, res = response) => {
    const {collection, id} = req.params

    let model;
    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if(!model){ 
                return res.status(400).json({ msg: `The user with id ${id} do not exist`})
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model){ 
                return res.status(400).json({ msg: `The product with id ${id} do not exist`})
            }
            break;
    
        default:
            return res.status(500).json({msg:'Invalid route, contact me'})
            break;
    }

    if(model.img){
        const imagPath = path.join(__dirname, '../uploads', collection, model.img);
        if(fs.existsSync(imagPath)){
            return res.sendFile(imagPath);
        }
    }

    const imgPath = path.join(__dirname, '../assets', 'no-image.jpg');
    if(fs.existsSync(imgPath)){
        return res.sendFile(imgPath)
    }

}

module.exports = {
    uploadFile,
    updateImage,
    showImages,
    updateImageCloudinary
}