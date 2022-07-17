const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Connection = require('../models/Connection');
const Pool = require('../models/Pool');
const getWsToken = require('../middleware/get-token');


// helper functions

// pulls desktop pool information from Workspot API
async function getWorkspotPools(token) {
    const url = `https://api.workspot.com/v1.0/pools?access_token=${token}`
    const desktopPools = await fetch(url)
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
    return desktopPools;
}

// store pool id and name info
async function createPool(pools, connection) {
        const desktopPools = pools.desktopPools;
    for (let i = 0; i < desktopPools.length; i++) {
        if (!(await Pool.exists({poolId: desktopPools[i].id}))) {
            await Pool.create({
                connectionName: connection,
                poolName: desktopPools[i].name,
                poolId: desktopPools[i].id,
                });
            return
        }
    }
}

// pull available desktops based on poolId
async function getDesktops(poolId){
    // fetch desktops with poolId
}


// routes


// workspot dashboard screen
router.get('/', async (req, res, next) => {
    // pull connection information from db
    const wsConnection = await Connection.findOne({connectionName: req.query.dashboard});

    // check token expiration, refresh token if so
    if (Date.now() > wsConnection.apiTokenRefreshTime) {
        var token = await getWsToken(wsConnection.apiAdmin, wsConnection.apiAdminPassword, wsConnection.wsClientId, wsConnection.wsClientSecret);
        var key = token.access_token;
        await Connection.updateOne({apiAccessToken: wsConnection.apiAccessToken},{$set: {apiAccessToken: key, apiTokenRefreshTime: new Date(Date.now() + 3600000)}});
        }

    // get available desktop pools and render page    
    const pools = await getWorkspotPools(key ? key : wsConnection.apiAccessToken);
    await createPool(pools, req.query.dashboard);
    res.render('dashboard', {desktopPools: pools.desktopPools});
    }
);

// pull desktops associated with poolName
router.post('/desktops', async(req, res, next) => {
    // lookup poolId based on req.body.poolName
        console.log(req.body.poolName);
        // const poolId = Pool.findOne({connectionName: req.body.poolName});
    // use fetch api to get desktops with poolId
        // getDesktops(poolId);
    // populate desktop info into pug locals and render
});

// router.get('/public', (req, res, next) => {
//     res.redirect(301, '/public');
// });

module.exports = router;