const { Router } = require('express');
const { check } = require('express-validator');

// const { controllerAuth, googleAuth } = require('../controllers/controller-auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { productIdExist, categoryIdExist } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares');
const { productGET, productsGET, productPOST, productPUT, productDELETE } = require('../controllers/products-controller');

const router = Router()

//  Get all categories
router.get('/', productsGET);

// Get a single category with ID
router.get('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(productIdExist),
    validateFields
], productGET)

//  Create a category - private - anyone with a valid token
router.post('/', [
    validateJWT, 
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'No a valid category ID of Mongo').isMongoId(),
    check('category').custom(categoryIdExist),
    validateFields
], productPOST )

//  Update a category by ID
router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(productIdExist),
    check('category').optional().custom(categoryIdExist),
    validateFields
], productPUT)

//  Delete a category with ID - only with ADMIN_ROLE
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(productIdExist),
    validateFields
], productDELETE)

module.exports = router