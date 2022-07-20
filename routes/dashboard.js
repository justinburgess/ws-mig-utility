const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Connection = require('../models/Connection');
const Pool = require('../models/Pool');
const bodyParser = require('body-parser');
const getToken = require('../middleware/get-token');


// helper functions

// pull available desktops based on poolId
async function wsGet(url){
    // fetch desktops with poolId
    const get = await fetch(url)
                .then(res => res.json())
                .catch(error => console.log('Looks like there was a problem!', error))
    return get;
}


// routes

// workspot dashboard screen
router.get('/', async (req, res, next) => {

    // pull connection information from db
    const wsConnection = await Connection.findOne({connectionName: req.query.dashboard});
    const pools = await Pool.find({connectionName: req.query.dashboard});
    res.render('dashboard', {desktopPools: pools});
    
    }
);

// pull desktops associated with poolName
router.post('/desktops', async(req, res, next) => {
    // lookup poolId based on req.body.poolName
    const pool = await Pool.findOne({poolName: req.body.poolName});
    // lookup api token
    const connection = await Connection.findOne({connectionName: pool.connectionName})
    // use fetch api to get desktops with poolId
    const desktops = await wsGet(`https://api.workspot.com/v1.0/pools/${pool.poolId}/desktops?access_token=${connection.apiAccessToken}`);
    // populate desktop info into pug locals and render
    // res.render('dashboard', {desktops: desktops.desktops});
});

// router.get('/public', (req, res, next) => {
//     res.redirect(301, '/public');
// });

module.exports = router;