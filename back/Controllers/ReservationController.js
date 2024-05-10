const express = require("express");
const router = express.Router();
const sql = require('mssql');

class ReservationController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllReservations.bind(this));
        router.post('/', this.createReservation.bind(this));
        router.get('/:reservationId', this.getReservationById.bind(this));
        router.delete('/:reservationId', this.deleteReservation.bind(this));
    }

    async getAllReservations(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from reservations", (err, records)=> {
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

    async createReservation(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO reservations (clientId,tableId) VALUES ('${req.body.clientId}', '${req.body.tableId}')`, (err, records)=> {
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

    async getReservationById(req, res, next) {
        try {
            const reservationId = req.params.reservationId;

            let request = new sql.Request();
            request.query(`select * from reservations where id=${reservationId}`, (err, records)=> {
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

 

    async deleteReservation(req, res, next) {
        try {
            const reservationId = req.params.reservationId;

            let request = new sql.Request();
            request.query(`delete from reservations where id='${reservationId}'`, (err, records)=> {
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
}

module.exports = new ReservationController().router;