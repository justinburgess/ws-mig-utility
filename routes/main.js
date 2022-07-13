const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');


router.get('/', async (req, res, next) => {
    // read available connections
    const connections = await Connection.find();

    res.render('main', {connections});
});

router.post('/', (req, res, next) => {
    res.send(req.body);
});

module.exports = router;