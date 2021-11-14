const { Router } = require('express');

const { controllerGET, controllerPUT, controllerPOST, controllerDELETE, controllerPATCH } = require('../controllers/user');

const router = Router()

router.get('/', controllerGET )

router.put('/:id', controllerPUT )

router.post('/', controllerPOST )

router.delete('/', controllerDELETE )

router.patch('/', controllerPATCH )

module.exports = router