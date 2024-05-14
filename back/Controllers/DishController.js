const express = require("express");
const router = express.Router();
const sql = require('mssql');

class DishController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllDishes.bind(this));
        router.post('/', this.createDish.bind(this));
        router.get('/:dishId', this.getDishById.bind(this));
        router.patch('/:dishId', this.updateDish.bind(this));
        router.delete('/:dishId', this.deleteDish.bind(this));
        router.delete('/', this.deleteAllDishes.bind(this));
    }

    async getAllDishes(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from dishes", (err, records)=> {
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

    async createDish(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO dishes (titre,description,image, prix, categorieId,day) VALUES ('${req.body.titre}', '${req.body.description}', '${req.body.image}', '${req.body.prix}',, '${req.body.categorieId}', '${req.body.day}')`, (err, records)=> {
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

    async getDishById(req, res, next) {
        try {
            const dishId = req.params.dishId;

            let request = new sql.Request();
            request.query(`select * from dishes where id=${dishId}`, (err, records)=> {
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
    async updateDish(req, res, next) {
        try {
            const dishId = req.params.dishId;
            const { titre, description, image, prix, categorieId, day } = req.body;
    
            let request = new sql.Request();
            request.query(`UPDATE dishes SET titre='${titre}', description='${description}', image='${image}', prix='${prix}', categorieId='${categorieId}', day='${day}' WHERE id=${dishId}`, (err, records) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: 'Failed to update dish' });
                } else {
                    res.status(200).json({ status: 'success', data: records });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
    
    async deleteDish(req, res, next) {
        try {
            const dishId = req.params.dishId;

            let request = new sql.Request();
            request.query(`delete from dishes where id='${dishId}'`, (err, records)=> {
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

    async deleteAllDishes(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`delete from dishes`, (err, records)=> {
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

module.exports = new DishController().router;
