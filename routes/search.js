const { Router } = require('express');
const { searchGET } = require('../controllers/search-controller');

const router = Router();

router.get('/:collection/:term', searchGET)

module.exports = router