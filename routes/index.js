const express = require('express');
const router = express.Router();
// const login = require('./login')


router.get("/", (req, res) => {
    res.redirect(301, 'main');
    // const name = req.cookies.username;
    // if(name){
    //     res.render('../views/index', {name});
    // } else {
    //     res.redirect("/hello");
    // }
});



// router.get('/dashboard', (req, res, next) => {
//     res.render('dashboard');
// });

module.exports = router;