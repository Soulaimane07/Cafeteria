const mongoose = require('mongoose')

const tableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    capacite: Number,
    dispo: Boolean,
})

module.exports = mongoose.model('Table', tableSchema)
