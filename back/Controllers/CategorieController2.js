const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Categorie = require('../Models/Categorie')


const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images/Categories')
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})



router.get('/', (req, res, next) => {
    Categorie.find()
        .select('_id titre image')
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
    console.log('hh', req.body);
    console.log('kk', req.file);

    const user = new Categorie({
        _id: new mongoose.Types.ObjectId(),
        titre: req.body.titre,
        image: req.file.path,
    })

    user.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:catId', (req, res, next) => {
    const catId = req.params.catId

    Categorie.find({_id: catId})
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

module.exports = router
