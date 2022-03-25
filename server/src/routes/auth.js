const { login, register, verifiedToken, all } = require('../controllers/auth');
const router = require('express').Router();

// register user
router.post('/register', register);
// login user
router.post('/login', login);
// verify token
router.get('/verify', verifiedToken)
// getallusers
router.get('/all', all)
module.exports = router;