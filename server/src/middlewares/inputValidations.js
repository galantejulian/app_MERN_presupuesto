const { check } = require('express-validator');

const inputValidations = [
    check('amount', 'Amount cannot be empty').not().isEmpty().bind(),
    check('amount', 'It has to be numeric').isNumeric(),
    check('concept', 'The value should be type string').notEmpty().not().isNumeric(),
    check('date', 'Date connot be empty').not().isEmpty(),
];


module.exports = inputValidations;