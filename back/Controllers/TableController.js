const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Table = require('../Models/Table')

router.get('/', (req, res, next) => {
    Table.find()
        .select('_id capacite dispo')
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
    const table = new Table({
        _id: new mongoose.Types.ObjectId(),
        capacite: req.body.capacite,
        dispo: req.body.dispo,
    })

    table.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})



router.delete('/:tableId', (req, res, next) => {
    const tableId = req.params.tableId

    Table.deleteOne({_id: tableId})
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
    Table.deleteMany()
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