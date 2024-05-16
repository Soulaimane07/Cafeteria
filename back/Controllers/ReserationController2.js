const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Reservation = require('../Models/Reservation')

router.get('/', (req, res, next) => {
    Reservation.find()
        .select('_id user table')
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
    const reservation = new Reservation({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        table: req.body.table,
    })

    reservation.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.post('/isfavorated', (req, res, next) => {
    let user = req.body.user
    let table = req.body.table

    Reservation.find({user: user, table: table})
        .then(docs => {
            res.status(200).json({status: "success", data: docs.length === 0 ? false : docs[0]})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId

    Reservation.find({user: userId})
        .select("_id user table")
        .populate('user')
        .populate('table')
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.delete('/:reservationId', (req, res, next) => {
    const reservationId = req.params.reservationId

    Reservation.deleteOne({_id: reservationId})
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
    Reservation.deleteMany()
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