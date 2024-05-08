const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../Models/User');

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
            const users = await User.find().select('_id fname lname email pass').exec();
            res.status(200).json({ status: "success", data: users });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async createUser(req, res, next) {
        try {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                pass: req.body.pass,
            });
            const newUser = await user.save();
            res.status(201).json({ status: "success", data: newUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getUserById(req, res, next) {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId).select('_id fname lname email pass').exec();
            res.status(200).json({ status: "success", data: user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async loginUser(req, res, next) {
        try {
            const email = req.body.email;
            const pass = req.body.pass;
            const user = await User.findOne({ email: email, pass: pass }).select('_id fname lname email').exec();
            if (user) {
                res.status(200).json({ status: "success", data: user });
            } else {
                res.status(500).json({ error: "Invalid credentials" });
            }
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
            await User.updateOne({ _id: userId }, { $set: updateOps }).exec();
            res.status(200).json({ status: "success", message: "User updated" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.userId;
            await User.deleteOne({ _id: userId }).exec();
            res.status(200).json({ status: "success", message: "User deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async deleteAllUsers(req, res, next) {
        try {
            await User.deleteMany().exec();
            res.status(200).json({ status: "success", message: "All users deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
}

module.exports = new UserController().router;
