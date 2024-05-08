const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Paiment = require('../Models/Paiment');

class PaymentController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllPayments.bind(this));
        router.post('/', this.createPayment.bind(this));
        router.get('/:paymentId', this.getPaymentById.bind(this));
        router.delete('/:paymentId', this.deletePayment.bind(this));
        router.delete('/', this.deleteAllPayments.bind(this));
    }

    async getAllPayments(req, res, next) {
        try {
            const payments = await Paiment.find().select('_id user order stripeId').exec();
            res.status(200).json({ status: "success", data: payments });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async createPayment(req, res, next) {
        try {
            const payment = new Paiment({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                order: req.body.order,
                stripeId: req.body.stripeId
            });
            const newPayment = await payment.save();
            res.status(201).json({ status: "success", data: newPayment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getPaymentById(req, res, next) {
        try {
            const paymentId = req.params.paymentId;
            const payment = await Paiment.findById(paymentId).select('_id user order stripeId').exec();
            res.status(200).json({ status: "success", data: payment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deletePayment(req, res, next) {
        try {
            const paymentId = req.params.paymentId;
            await Paiment.deleteOne({ _id: paymentId }).exec();
            res.status(200).json({ status: "success", message: "Payment deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deleteAllPayments(req, res, next) {
        try {
            await Paiment.deleteMany().exec();
            res.status(200).json({ status: "success", message: "All payments deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
}

module.exports = new PaymentController().router;
