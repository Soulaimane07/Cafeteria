const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Reservation = require('../Models/Rerservation')
const Reservation = require("../Models/Reservation")

router.get('/', (req, res, next) => {
    Reservation.find()
        .select('_id')
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
    const reservation= new Reservation({
        _id: new mongoose.Types.ObjectId(),
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

router.get('/:ReservationId', (req, res, next) => {
    const ReservationId = req.params.ReservationIdId

    Reservation.find({_id: ReservationId})
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:ReservationId', (req, res, next) => {
    const ReservationId = req.params.ReservationId

    const UpdateReservation = {
        id: req.body.id,
    }

    Reservation.updateOne({_id: ReservationId}, {$set: UpdateReservation})
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

router.delete('/:ReservationId', (req, res, next) => {
    const ReservationId = req.params.ReservationId
   
    Reservation.deleteOne({_id: ReservationId})
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