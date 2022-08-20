const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { uploadFile, showImages, updateImageCloudinary } = require('../controllers/uploads-controller');
const { allowedCollectionsHelper } = require('../helpers/db-validators');
const { validateFiles } = require('../middlewares/validate-files');

const router = Router()

router.post('/', [validateFiles], uploadFile);

router.put('/:collection/:id', [
    check('id', "Must be a MongoID").isMongoId(),
    check('collection').custom( c => allowedCollectionsHelper( c, ['users', 'products']) ),
    validateFiles,
    validateFields
], updateImageCloudinary )

router.get('/:collection/:id', [
    check('id', "Must be a MongoID").isMongoId(),
    check('collection').custom( c => allowedCollectionsHelper( c, ['users', 'products']) ),
    validateFields
], showImages)

module.exports = router