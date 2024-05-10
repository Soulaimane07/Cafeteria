const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')



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

const userController = require('./Controllers/UserContoller');
app.use('/users', userController);

const paimentsController = require('./Controllers/PaimentController')
app.use('/paiments', paimentsController)

const favoritsRoutes = require('./Controllers/FavoritController')
app.use('/favorits', favoritsRoutes)

const ordersRoutes = require('./Controllers/OrderController')
app.use('/orders', ordersRoutes)





module.exports = app