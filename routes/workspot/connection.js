const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Connection = require('../../models/Connection');
const Pool = require('../../models/Pool');
const bodyParser = require('body-parser');
const getToken = require('../../middleware/get-token');

// auth with google
router.post('/add', async (req, res, next) => {
    try {
        await createToken(req);
    } catch {
        return res.status(403);
    }
    res.redirect(303, '/main');
});

// delete workspot api connection and relavent data
router.delete('/delete', async (req, res, next) => {
    await Connection.deleteOne({connectionName: req.body.name});
    await Pool.deleteOne({connectionName: req.body.name});
    res.redirect(301, '/main')
});



// helper functions

async function createToken(req, res, next) {
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

        Connection.create(connectionData);
        return
}

function checkToken() {
    // pull expiration time from database
    // compare time to current time
    // if less than 2s, wait 3s and obtain another token
}

function refreshToken() {
    
}

module.exports = router;