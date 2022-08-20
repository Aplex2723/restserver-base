const { Router } = require('express');
const { check } = require('express-validator');

// const { controllerAuth, googleAuth } = require('../controllers/controller-auth');
const { createCategory, categoryGET, categoryGETByID, categoryPUT, categoryDELETE } = require('../controllers/categories-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { categoryIdExist } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares');

const router = Router()

//  Get all categories
router.get('/', categoryGET);

// Get a single category with ID
router.get('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(categoryIdExist),
    validateFields
], categoryGETByID)

//  Create a category - private - anyone with a valid token
router.post('/', [
    validateJWT, 
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory )

//  Update a category by ID
router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(categoryIdExist),
    validateFields
], categoryPUT)

//  Delete a category with ID - only with ADMIN_ROLE
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(categoryIdExist),
    validateFields
], categoryDELETE)
module.exports = router