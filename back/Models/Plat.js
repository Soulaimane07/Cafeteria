const mongoose = require('mongoose')

const platSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: String,
    description: String,
    image: String,
    prix: Number,
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
    },
})

module.exports = mongoose.model('Plat', platSchema)
