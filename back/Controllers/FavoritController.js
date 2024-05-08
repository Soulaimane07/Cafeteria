const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Favorit = require('../Models/Favorit')


router.get('/', (req, res, next) => {
    Favorit.find()
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
    const Favorit = new Favorit({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        plat: req.body.plat,
    })
    Favorit.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:FavoritId', (req, res, next) => {
    const FavoritId = req.params.FavoritId

    Favorit.find({_id: FavoritId})
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})



router.patch('/:FavoritId', (req, res, next) => {
    const FavoritId = req.params.FavoritId

    const UpdateFavorit = {
        user: req.body.user,
        plat: req.body.plat,
      
    }

    Favorit.updateOne({_id: FavoritId}, {$set: UpdateFavorit})
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

router.delete('/:FavoritId', (req, res, next) => {
    const FavoritId = req.params.FavoritId
   
    Favorit.deleteOne({_id: FavoritId})
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
    Favorit.deleteMany()
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