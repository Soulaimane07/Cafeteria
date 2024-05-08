const mongoose = require('mongoose')

const categorieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: String,
    image: String,
})

module.exports = mongoose.model('Categorie', categorieSchema)