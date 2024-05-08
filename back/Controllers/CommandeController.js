const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Commande = require('../Models/Commande')


router.get('/', (req, res, next) => {
    Commande.find()
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
    const commande = new Commande({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        plat: req.body.plat,
    })
    commande.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:CommandeId', (req, res, next) => {
    const CommandeId = req.params.CommandeId

    Commande.find({_id: CommandeId})
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})



router.patch('/:CommandeId', (req, res, next) => {
    const CommandeId = req.params.CommandeId

    const UpdateCommande = {
        user: req.body.user,
        plat: req.body.plat,
      
    }

    Commande.updateOne({_id: CommandeId}, {$set: UpdateCommande})
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

router.delete('/:CommandeId', (req, res, next) => {
    const CommandeId = req.params.CommandeId
   
    Favorit.deleteOne({_id: CommandeId})
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
    Commande.deleteMany()
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