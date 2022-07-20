const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Connection = require('../../models/Connection');
const Pool = require('../../models/Pool');
const Desktop = require('../../models/Desktop')
const bodyParser = require('body-parser');
const getToken = require('../../middleware/get-token');

// auth with google
router.post('/add', async (req, res, next) => {
    try {
        await createConnection(req);
    } catch {
        return res.status(403);
    }
    res.redirect(303, '/main');
});

// delete workspot api connection and relavent data
router.delete('/delete', async (req, res, next) => {
    await Connection.deleteOne({connectionName: req.body.name});
    await Pool.deleteOne({connectionName: req.body.name});
    await Desktop.deleteMany({connectionName: req.body.name});
    res.redirect(301, '/main')
});



// helper functions

// store pool id and name info
async function createPool(token, connection) {

    // get all available pools via access token
    const pools = await wsGet(`https://api.workspot.com/v1.0/pools?access_token=${token}`);
    const desktopPools = pools.desktopPools;

    // creating database object for each pool
    for (let i = 0; i < desktopPools.length; i++) {
        if (!(await Pool.exists({connectionName: connection}))) {
            await Pool.create({
                connectionName: connection,
                poolName: desktopPools[i].name,
                poolId: desktopPools[i].id,
                cloud: desktopPools[i].cloud,
                template: desktopPools[i].template,
                status: desktopPools[i].status,
                vmType: desktopPools[i].vmType,
                poolType: desktopPools[i].poolType,
                });
            return
        }
    }
}

// store pool id and name info
async function createDesktop(token, connection) {

    // get pools associated with connection
    const pools = await Pool.find({connectionName: connection})

    // create desktop machines if does not exist with connection
    for (let i = 0; i < pools.length; i++) {
        const desktops = await wsGet(`https://api.workspot.com/v1.0/pools/${pools[i].poolId}/desktops?access_token=${token}`);
        const allDesktops = desktops.desktops;
        for (let j = 0; j < allDesktops.length; j++){
            if (!(await Desktop.exists({connectionName: connection, name: allDesktops[i].name}))) {
                await Desktop.create({
                    connectionName: connection,
                    name: allDesktops[i].name,
                    email: allDesktops[i].email,
                    poolName: allDesktops[i].poolName,
                    status: allDesktops[i].status,
                    id: allDesktops[i].id,
                    poolId: allDesktops[i].poolId,
                });
            }
        }
    }
    return                      
}


async function createConnection(req, res, next) {
    const token = await getToken(req.body.apiAdmin,
        req.body.apiAdminPassword,
        req.body.wsClientId,
        req.body.wsClientSecret);

        const connectionData = {
        connectionName: req.body.connectionName,
        apiAdmin: req.body.apiAdmin,
        apiAdminPassword: req.body.apiAdminPassword,
        wsClientId: req.body.wsClientId,
        wsClientSecret: req.body.wsClientSecret,
        apiAccessToken: token.access_token,
        apiTokenRefreshTime: new Date(Date.now() + 3600000),
        }

        await Connection.create(connectionData);
        // create pool data and upload to database
        await createPool(token.access_token, connectionData.connectionName);
        // create desktop
        await createDesktop(token.access_token, connectionData.connectionName);
        return
}

// run get request against provided ws api url
async function wsGet(url){
    // fetch desktops with poolId
    const get = await fetch(url)
                .then(res => res.json())
                .catch(error => console.log('Looks like there was a problem!', error))
    return get;
}

function checkToken() {
    // pull expiration time from database
    // compare time to current time
    // if less than 2s, wait 3s and obtain another token
}

function refreshToken() {
    // check token expiration, refresh token if so
    // const wsConnection = await Connection.findOne({connectionName: req.query.dashboard});
    // if (Date.now() > wsConnection.apiTokenRefreshTime) {
    //     var token = await getToken(wsConnection.apiAdmin, wsConnection.apiAdminPassword, wsConnection.wsClientId, wsConnection.wsClientSecret);
    //     var key = token.access_token;
    //     await Connection.updateOne({apiAccessToken: wsConnection.apiAccessToken},{$set: {apiAccessToken: key, apiTokenRefreshTime: new Date(Date.now() + 3600000)}});
    //     }
}

module.exports = router;