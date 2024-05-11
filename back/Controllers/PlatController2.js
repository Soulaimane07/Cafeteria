const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Plat = require('../Models/Plat')


const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images/plats')
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})



router.get('/', (req, res, next) => {
    Plat.find()
        .select('_id titre description image prix categorie')
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

router.post('/', upload.single('image'), (req, res, next) => {
    const plat = new Plat({
        _id: new mongoose.Types.ObjectId(),
        titre: req.body.titre,
        description: req.body.description,
        prix: req.body.prix,
        categorie: req.body.categorie,
        image: req.file.path,
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
        .select("_id titre description image prix categorie")
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs[0]})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.get('/categorie/:catId', (req, res, next) => {
    const catId = req.params.catId

    Plat.find({categorie: catId})
        .select("_id titre description image prix categorie")
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
        image: req.body.image,
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
