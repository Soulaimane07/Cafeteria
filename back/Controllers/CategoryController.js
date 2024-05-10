const express = require("express");
const router = express.Router();
const sql = require('mssql');

class CategoryController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllDishes.bind(this));
        router.post('/', this.createDish.bind(this));
        router.get('/:userId', this.getDishById.bind(this));
        router.patch('/:userId', this.updateDish.bind(this));
        router.delete('/:userId', this.deleteDish.bind(this));
        router.delete('/', this.deleteAllDishes.bind(this));
    }

    async getAllCategories(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from categories", (err, records)=> {
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

    async createCategory(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO categories (titre,image) VALUES ('${req.body.titre}', '${req.body.image}')`, (err, records)=> {
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

    async getCategoryById(req, res, next) {
        try {
            const categoryId = req.params.categoryId;

            let request = new sql.Request();
            request.query(`select * from categories where id=${categoryId}`, (err, records)=> {
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

    async updateCategory(req, res, next) {
        try {
            const categoryId = req.params.categoryId;

            const updateOps = {};
            for (const ops of req.body) {
                updateOps[ops.propName] = ops.value;
            }

            res.status(200).json({ status: "success", message: "User updated" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const categoryId = req.params.categoryId;

            let request = new sql.Request();
            request.query(`delete from categories where id='${categoryId}'`, (err, records)=> {
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

    async deleteAllCategories(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`delete from categories`, (err, records)=> {
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

module.exports = new CategoryController().router;
