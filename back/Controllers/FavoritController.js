const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Favorit = require('../Models/Favorit')


router.get('/favorit', (req, res, next) => {
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