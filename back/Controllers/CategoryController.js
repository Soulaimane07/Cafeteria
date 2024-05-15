const express = require("express");
const router = express.Router();
const sql = require('mssql');

class CategoryController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllCategories.bind(this));
        router.post('/', this.createCategory.bind(this));
        router.get('/:categoryId', this.getCategoryById.bind(this));
        router.patch('/:categoryId', this.updateCategory.bind(this));
        router.delete('/:categoryId', this.deleteCategory.bind(this));
        router.delete('/', this.deleteAllCategories.bind(this));
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
            const { titre, image } = req.body;
    
            let request = new sql.Request();
            request.query(`UPDATE categories SET titre='${titre}', image='${image}' WHERE id=${categoryId}`, (err, records) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: 'Failed to update category' });
                } else {
                    res.status(200).json({ status: 'success', data: records });
                }
            });
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
