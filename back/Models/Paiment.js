const mongoose = require('mongoose')

const paimentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    },
    order: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Order",
        type: String,
    },
    stripeId: String
})

module.exports = mongoose.model('Paiment', paimentSchema)