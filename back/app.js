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

const usersRoutes = require('./Controllers/UserContoller')
app.use('/users', usersRoutes)

const paimentsRoutes = require('./Controllers/PaimentController')
app.use('/paiments', paimentsRoutes)

const categorieRoutes = require('./Controllers/CategorieController')
app.use('/categorie', categorieRoutes)

const platRoutes = require('./Controllers/PlatController')
app.use('/plat', platRoutes)






module.exports = app