const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.redirect(301, 'main');
    // const name = req.cookies.username;
    // if(name){
    //     res.render('../views/index', {name});
    // } else {
    //     res.redirect("/hello");
    // }
});

module.exports = router;