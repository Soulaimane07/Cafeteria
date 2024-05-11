const express = require("express");
const router = express.Router();
const sql = require('mssql');

class FavoritController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllFavorits.bind(this));
        router.post('/', this.createFavorit.bind(this));
        router.get('/:userId', this.getFavoritByClient.bind(this));
        router.delete('/:favoritId', this.deleteFavorit.bind(this));
        router.delete('/', this.deleteAllFavorits.bind(this));
    }

    async getAllFavorits(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from favorits", (err, records)=> {
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

    async createFavorit(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO favorits (clientId,dishId) VALUES ('${req.body.clientId}', '${req.body.dishId}')`, (err, records)=> {
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

    async getFavoritByClient(req, res, next) {
        try {
            const userId = req.params.userId;

            let request = new sql.Request();
            request.query(`select * from favorits where userid=${userId}`, (err, records)=> {
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

    async deleteFavorit(req, res, next) {
        try {
            const favoritId = req.params.favoritId;

            let request = new sql.Request();
            request.query(`delete from favorits where id='${favoritId}'`, (err, records)=> {
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

    async deleteAllFavorits(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`delete from favorits`, (err, records)=> {
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

module.exports = new FavoritController().router;