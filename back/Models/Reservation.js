const mongoose = require('mongoose')

const ReservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        unique: false,
    },
    Client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    }
   
})

module.exports = mongoose.model('Reservation', ReservationSchema)