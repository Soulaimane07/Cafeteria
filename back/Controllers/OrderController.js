const express = require("express");
const router = express.Router();
const sql = require('mssql');

class OrderController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllOrders.bind(this));
        router.post('/', this.createOrder.bind(this));
        router.get('/:orderId', this.getOrderById.bind(this));
        router.patch('/:orderId', this.updateOrder.bind(this));
        router.delete('/:orderId', this.deleteOrder.bind(this));
        router.delete('/', this.deleteAllOrders.bind(this));
        router.get('/:userId', this.getOrderByClient.bind(this));
    }

    async getAllOrders(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from orders", (err, records)=> {
                if(err) console.log(err);
                else {
                    res.status(200).json({ status: "success", data: records.recordsets[0] });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async createOrder(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO orders (clientId,dishId) VALUES ('${req.body.clientId}', '${req.body.dishId}')`, (err, records)=> {
                if(err) console.log(err);
                else {
                    res.status(200).json({ status: "success", data: records });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getOrderById(req, res, next) {
        try {
            const orderId = req.params.orderId;

            let request = new sql.Request();
            request.query(`select * from orders where id=${orderId}`, (err, records)=> {
                if(err) console.log(err);
                else {
                    res.status(200).json({ status: "success", data: records.recordsets[0] });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getOrderByClient(req, res, next) {
        try {
            const userId = req.params.userId;

            let request = new sql.Request();
            request.query(`select * from orders where clientId=${userId}`, (err, records)=> {
                if(err) console.log(err);
                else {
                    res.status(200).json({ status: "success", data: records.recordsets[0] });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async updateOrder(req, res, next) {
        try {
            const orderId = req.params.orderId;

            const updateOps = {};
            for (const ops of req.body) {
                updateOps[ops.propName] = ops.value;
            }

            res.status(200).json({ status: "success", message: "Order updated" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const orderId = req.params.orderId;

            let request = new sql.Request();
            request.query(`delete from orders where id='${orderId}'`, (err, records)=> {
                if(err){
                    res.status(400).json();
                    console.log(err);
                } else {
                    res.status(200).json({ status: "success", data: records.recordsets[0]});
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deleteAllOrders(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`delete from orders`, (err, records)=> {
                if(err){
                    res.status(400).json();
                    console.log(err);
                } else {
                    res.status(200).json({ status: "success"});
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
}

module.exports = new OrderController().router;