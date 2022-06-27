const express = require('express');
const publicrouter = express.Router();
const User = require('../models/user');

publicrouter.get('/', async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})

publicrouter.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json(error);
    }
})


module.exports = { publicrouter };