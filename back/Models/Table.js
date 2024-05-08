const mongoose = require('mongoose')

const TableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Capacite: Number,
    Image: String,
    Disponibilite:{ type: Boolean, default: false },
    })

module.exports = mongoose.model('Table', TableSchema)