const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
}, { versionKey: false, });

module.exports = model('User', userSchema)