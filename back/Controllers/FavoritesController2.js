const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Favorite = require('../Models/Favorite')

router.get('/', (req, res, next) => {
    Favorite.find()
        .select('_id user plat')
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
    const favorite = new Favorite({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        plat: req.body.plat,
    })

    favorite.save()
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
    let plat = req.body.plat

    Favorite.find({user: user, plat: plat})
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

    Favorite.find({user: userId})
        .select("_id user plat")
        .populate('user')
        .populate('plat')
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.delete('/:favoriteId', (req, res, next) => {
    const favoriteId = req.params.favoriteId

    Favorite.deleteOne({_id: favoriteId})
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
    Favorite.deleteMany()
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