const express = require("express");
const router = express.Router();
const sql = require('mssql');

class UserController {
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router = router;
        router.get('/', this.getAllUsers.bind(this));
        router.post('/', this.createUser.bind(this));
        router.get('/:userId', this.getUserById.bind(this));
        router.post('/login', this.loginUser.bind(this));
        router.patch('/:userId', this.updateUser.bind(this));
        router.delete('/:userId', this.deleteUser.bind(this));
        router.delete('/', this.deleteAllUsers.bind(this));
    }

    async getAllUsers(req, res, next) {
        try {
            let request = new sql.Request();
            request.query("select * from users", (err, records)=> {
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

    async createUser(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`INSERT INTO users (email, fname, lname, pass, role) VALUES ('${req.body.email}', '${req.body.fname}', '${req.body.lname}', '${req.body.pass}', 'client')`, (err, records)=> {
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

    async getUserById(req, res, next) {
        try {
            const userId = req.params.userId;

            let request = new sql.Request();
            request.query(`select * from users where id=${userId}`, (err, records)=> {
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

    async loginUser(req, res, next) {
        try {
            const email = req.body.email;
            const pass = req.body.pass;


            let request = new sql.Request();
            request.query(`select * from users where email='${email}' and pass='${pass}'`, (err, records)=> {
                if(err){
                    res.status(400).json();
                    console.log(err);
                } else {
                    res.status(200).json({ status: "success", data: records.recordset[0] });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async updateUser(req, res, next) {
        try {
            const userId = req.params.userId;

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

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.userId;

            let request = new sql.Request();
            request.query(`delete from users where id='${userId}'`, (err, records)=> {
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

    async deleteAllUsers(req, res, next) {
        try {
            let request = new sql.Request();
            request.query(`delete from users`, (err, records)=> {
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

module.exports = new UserController().router;
