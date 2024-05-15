const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Paiment = require('../Models/Paiment')

const stripe = require('stripe')('sk_test_51PEJqJAjFPVVpGXvzTxo9OjsTu8xRZAmkZjs6kabZfyTqyGUleQH47Lkl2ooWjySe2y1XGI6e054dkgfTybZ2Duz00LLtx3nU7');
const YOUR_DOMAIN = 'http://localhost:3000';


router.get('/', (req, res, next) => {
    Paiment.find()
        .select('_id user order stripeId')
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
    const paiment = new Paiment({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        order: req.body.order,
        stripeId: req.body.stripeId
    })

    paiment.save()
        .then(docs => {
            res.status(201).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.post('/checkout', (req, res, next) => {
    console.log(req.body);
    try {
        const session = stripe.checkout.sessions.create({
            line_items: [
              {
                price: 'price_1PEK1bAjFPVVpGXviT98pX9z',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}`,
            cancel_url: `${YOUR_DOMAIN}`,
          });
        
          res.redirect(303, session.url);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
})

router.get('/:paimentId', (req, res, next) => {
    const paimentId = req.params.paimentId

    Paiment.find({_id: paimentId})
        .select("_id user order stripeId")
        .exec()
        .then(docs => {
            res.status(200).json({status: "success", data: docs})
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.delete('/:paimentId', (req, res, next) => {
    const paimentId = req.params.paimentId

    Paiment.deleteOne({_id: paimentId})
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
    Paiment.deleteMany()
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