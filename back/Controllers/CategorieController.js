const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Categorie = require('../Models/Categorie')

router.get('/', (req, res, next) => {
    Categorie.find()
        .select('_id titre image ')
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
    const categorie = new Categorie({
        _id: new mongoose.Types.ObjectId(),
        titre: req.body.titre,
        image: req.body.image,
    })

    categorie.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:categorieId', (req, res, next) => {
    const categorieId = req.params.categorieId

    Categorie.find({_id: categorieId})
        .select("_id titre image")
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:categorieId', (req, res, next) => {
    const categorieId = req.params.categorieId

    const UpdateCategorie = {
        titre: req.body.titre,
        image: req.body.image,
    }

    Categorie.updateOne({_id: categorieId}, {$set: UpdateCategorie})
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

router.delete('/:categorieId', (req, res, next) => {
    const categorieId = req.params.categorieId
   
    Categorie.deleteOne({_id: categorieId})
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