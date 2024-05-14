const express = require('express')
const app = express()
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require('body-parser')


mongoose.connect('mongodb+srv://soulaimane:1234@cluster0.tjuhvzz.mongodb.net/')
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})




// Routes

const usersRoutes = require('./Controllers/UserController2')
app.use('/users', usersRoutes)

const paimentsRoutes = require('./Controllers/PaimentController2')
app.use('/paiments', paimentsRoutes)

const catsRoutes = require('./Controllers/CategorieController2')
app.use('/categories', catsRoutes)

const platsRoutes = require('./Controllers/PlatController2')
app.use('/plats', platsRoutes)

const favoriteRoutes = require('./Controllers/FavoritesController2')
app.use('/favorites', favoriteRoutes)

const orderRoutes = require('./Controllers/OrderController2')
app.use('/orders', orderRoutes)











app.use('/public', express.static('Public'))
// app.use('/assets', express.static('View/assets'))

const path = require('path');


app.use((req, res, next) => {
    const error = new Error('Not fount')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})




module.exports = app