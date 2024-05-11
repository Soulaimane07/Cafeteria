const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Paiment = require('../Models/Paiment')

router.get('/', (req, res, next) => {
    Paiment.find()
        .select('_id user order stripeId')
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
    console.log(req.body);
    const paiment = new Paiment({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        order: req.body.order,
        stripeId: req.body.stripeId
    })

    paiment.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:paimentId', (req, res, next) => {
    const paimentId = req.params.paimentId

    Paiment.find({_id: paimentId})
        .select("_id user order stripeId")
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.delete('/:paimentId', (req, res, next) => {
    const paimentId = req.params.paimentId

    Paiment.deleteOne({_id: paimentId})
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
    Paiment.deleteMany()
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