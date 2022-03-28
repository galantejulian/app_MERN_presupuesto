const { Schema, model } = require('mongoose')

const movementSchema = new Schema({
    concept: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type: String,
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: false
});

module.exports = model('Movement', movementSchema)