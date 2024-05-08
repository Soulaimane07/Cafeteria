const mongoose = require('mongoose')

const platSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: String,
    description: String,
    image: String,
    prix: Number,
    categorie: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "categorie",
        type: String,
    },
})

module.exports = mongoose.model('Categorie', categorieSchema)