const { Router } = require('express');
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const { roleExist, validateEmail, idExist, validateLimitAndFrom } = require('../helpers/db-validators');

const { controllerGET, controllerPUT, controllerPOST, controllerDELETE, controllerPATCH } = require('../controllers/user');

const router = Router()

router.get('/', controllerGET )

router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(idExist),
    validateFields
] ,controllerPUT )

router.post('/',[
    //  Valition Middlewares
    check('name', 'We need a name').not().isEmpty(),
    check('email', 'This is not a valid email').isEmail(),
    check('email').custom( validateEmail ),
    check('password', 'Password most be longer than 6 charactere').isLength({ min: 6 }),
    /// check('role', 'Role not valid').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),

    //? Validating data from DB
    check('role').custom( roleExist),

    //* This check return the error in the request  
    validateFields
    
],controllerPOST )

router.delete('/:id',[

    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(idExist),
    validateFields

] ,controllerDELETE )

router.patch('/', controllerPATCH )

module.exports = router