const express = require("express");
const router = express.Router();
const sql = require('mssql');

class TableController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllTables.bind(this));
        router.post('/', this.createTable.bind(this));
        router.get('/:tableId', this.getTableById.bind(this));
        router.patch('/:tableId', this.updateTable.bind(this));
        router.delete('/:tableId', this.deleteTable.bind(this));
        router.delete('/', this.deleteAllTables.bind(this));
    }

    async getAllTables(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from tables", (err, records)=> {
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

    async createTable(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO tables (capacite, disponibilite) VALUES ('${req.body.capacite}', '${req.body.disponibilite}')`, (err, records)=> {
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

    async getTableById(req, res, next) {
        try {
            const tableId = req.params.tableId;

            let request = new sql.Request();
            request.query(`select * from tables where id=${tableId}`, (err, records)=> {
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

    async updateTable(req, res, next) {
        try {
            const tableId = req.params.tableId;
            const { capacite, disponibilite } = req.body;
    
            let request = new sql.Request();
            request.query(`UPDATE tables SET capacite='${capacite}', disponibilite='${disponibilite}' WHERE id=${tableId}`, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ error: "Failed to update table." });
                } else {
                    res.status(200).json({ status: "success", message: "Table updated successfully." });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
    

    async deleteTable(req, res, next) {
        try {
            const tableId = req.params.tableId;

            let request = new sql.Request();
            request.query(`delete from tables where id='${tableId}'`, (err, records)=> {
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

    async deleteAllTables(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`delete from tables`, (err, records)=> {
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
module.exports = new TableController().router;
