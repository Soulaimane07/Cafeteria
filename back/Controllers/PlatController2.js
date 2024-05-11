const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Plat = require('../Models/Plat')

router.get('/', (req, res, next) => {
    Plat.find()
        .select(' _id titre description image prix categorie')
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
    const plat = new Plat({
        _id: new mongoose.Types.ObjectId(),
        titre: req.body.titre,
        description: req.body.description,
        image: req.body.imqge,
        prix: req.body.prix,
        categorie: req.body.categorie,
    })

    plat.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:platId', (req, res, next) => {
    const platId = req.params.platId

    Plat.find({_id: platId})
        .select("_id titre description image prix categorie ")
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:platId', (req, res, next) => {
    const platId = req.params.platId

    const UpdatePlat = {
        titre: req.body.titre,
        description: req.body.description,
        image: req.body.imqge,
        prix: req.body.prix,
        categorie: req.body.categorie,
    }

    Plat.updateOne({_id: platId}, {$set: UpdatePlat})
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

router.delete('/:platId', (req, res, next) => {
    const platId = req.params.platId

    Plat.deleteOne({_id: platId})
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
