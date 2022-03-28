const router = require('express').Router();
const auth = require('../middlewares/auth')
const { create, all, update, remove } = require('../controllers/movements');
const validateErrors = require('../middlewares/validateErrors');
const inputValidations = require('../middlewares/inputValidations');

router.post('/', auth, inputValidations, validateErrors, create);
router.get('/', auth, all);
router.put('/', auth, inputValidations, validateErrors, update);
router.delete('/', auth, remove)

module.exports = router;