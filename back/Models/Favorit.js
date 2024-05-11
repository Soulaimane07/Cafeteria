const mongoose = require('mongoose')

const favoritSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    },
   /* plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat",
        unique: false,
    }
    */
   
})

module.exports = mongoose.model('Favorit', favoritSchema)