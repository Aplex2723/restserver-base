const { Router } = require('express');
const { check } = require('express-validator');

const { controllerAuth } = require('../controllers/controller-auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router()

router.post('/login',[

    check('email', 'This field is mandatory').isEmail(),
    check('password', 'Password Mandatory').not().isEmpty(),
    validateFields

] ,controllerAuth )


module.exports = router