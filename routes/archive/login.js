const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');


router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    res.redirect('/dashboard');
});

module.exports = router;