const { Schema, model } = require('mongoose')

const movementSchema = new Schema({
    concept: String,
    amount: {
        type: Number,
        required: [true, 'please add a positive or negative number']
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