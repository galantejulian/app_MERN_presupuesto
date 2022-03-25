const router = require('express').Router();
const auth = require('../middlewares/auth')
const { create, all, update, remove } = require('../controllers/movements');

router.post('/', auth, create);
router.get('/', auth, all);
router.put('/', auth, update);
router.delete('/', auth, remove)

module.exports = router;