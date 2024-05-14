const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat",
        unique: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    },
})

module.exports = mongoose.model('Order', orderSchema)