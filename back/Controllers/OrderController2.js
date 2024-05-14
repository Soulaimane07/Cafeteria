const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../Models/Order')

router.get('/', (req, res, next) => {
    Order.find()
        .select('_id user plat')
        .populate('user')
        .populate('plat')
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        plat: req.body.plat,
    })

    order.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId

    Order.find({user: userId})
        .select("_id user plat")
        .populate('user')
        .populate('plat')
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId

    Order.deleteOne({_id: orderId})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/', (req, res, next) => {
    Order.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router