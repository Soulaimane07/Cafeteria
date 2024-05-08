const mongoose = require('mongoose')

const commandeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    },
    Plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat",
        unique: false,
    }
   
})

module.exports = mongoose.model('Commande', commandeSchema)