const express = require('express');
const publicrouter = express.Router();
const Url = require('../models/url');


var public_controller = require('../controllers/publicController');

publicrouter.get('/', public_controller.home);
publicrouter.post('/endekno', public_controller.shrink);
publicrouter.get('/notfound', public_controller.notfound);

publicrouter.get(`/:shorturl/dashboard`, public_controller.dashboard);
publicrouter.get(`/:shorturl`, public_controller.redirect);


publicrouter.get('/test', async (req, res) => {
    try {
        const user = await Url.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = { publicrouter };