const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        unique: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    },
})

module.exports = mongoose.model('Reservation', reservationSchema)
