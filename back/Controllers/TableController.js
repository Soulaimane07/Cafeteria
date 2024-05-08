const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Table = require('../Models/Table')

router.get('/', (req, res, next) => {
    User.find()
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
    const Table = new Table({
        _id: new mongoose.Types.ObjectId(),
        Capacite: req.body.Capacite,
        Image: req.body.Image,
        Disponibilite: req.body.Disponibilite,
    })

    Table.save()
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

router.post('/login', (req, res, next) => {
    let email = req.body.email
    let pass = req.body.pass

    User.findOne({email: email, pass: pass})
        .select("_id fname lname email")
        .exec()
        .then(docs => {
            if(docs){
                res.status(200).json({status: "success", data: docs})
            } else {
                res.status(500).json({error: docs})
            }
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:userId', (req, res, next) => {
    const userId = req.params.userId

    const UpdateUser = {
        email: req.body.email,
        pass: req.body.pass,
        fname: req.body.fname,
        lname: req.body.lname,
    }

    User.updateOne({_id: userId}, {$set: UpdateUser})
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

router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId
   
    User.deleteOne({_id: userId})
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
    User.deleteMany()
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