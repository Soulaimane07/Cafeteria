const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Table = require('../Models/Table')

router.get('/', (req, res, next) => {
    Table.find()
        .select('_id Capacite image disponibilite')
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
    const table = new Table({
        _id: new mongoose.Types.ObjectId(),
        Capacite: req.body.Capacite,
        Image: req.body.Image,
        Disponibilite: req.body.Disponibilite,
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

router.get('/:TableId', (req, res, next) => {
    const TableId = req.params.TableId

    Table.find({_id: TableId})
        .select("_id Capacite image disponibilite ")
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:TableId', (req, res, next) => {
    const TableId = req.params.TableId

    const UpdateTable = {
        id: req.body.id,
        Capacite: req.body.Capacite,
        image: req.body.image,
        Disponibilite: req.body.Disponibilite,
    }

    Table.updateOne({_id: TableId}, {$set: UpdateTable})
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

router.delete('/:TableId', (req, res, next) => {
    const TableId = req.params.TableId
   
    Table.deleteOne({_id: TableId})
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