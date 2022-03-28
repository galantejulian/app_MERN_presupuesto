const { validationResult } = require('express-validator');

const validateErrors = (req, res, next) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        return next();
    }
    return res.status(400).json({ ok: false, errors: err.array() });
};

module.exports = validateErrors