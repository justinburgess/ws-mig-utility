const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
// const Connection = require('../../models/Connection');

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google
router.post('/workspot/add', async (req, res) => {
    const clientPair = req.body.wsClientId + ':' + req.body.wsClientSecret;
    const basicAuth = "Basic " + new Buffer.from(clientPair).toString('base64');
    
    let url = 'https://api.workspot.com/oauth/token';
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: basicAuth,
            // 'Cache-Control': 'no-cache',
        },
        body:`grant_type=password&username=${req.body.apiAdmin}&password=${req.body.apiAdminPassword}`,   
    }

    const response = await fetch(url, options)
                            .then(res => res.json())
                            .catch(e => {
                                console.error({
                                    "message": "An error occurred when obtaining the Workspot token.",
                                    error: e,
                                });
                            });

    const connectionData = {
        connectionName: req.body.connectionName,
        apiAdmin: req.body.apiAdmin,
        apiAdminPassword: req.body.apiAdminPassword,
        wsClientId: req.body.wsClientId,
        wsClientSecret: req.body.wsClientSecret,
        apiAccessToken: response.access_token,
        apiTokenRefreshTime: new Date(Date.now() + 3600000),
    }

    Connection.create(connectionData);

    console.log("RESPONSE: ", response);
    res.redirect(303, '/main');
});

// delete workspot api connection
router.delete('/workspot', async (req, res) => {
   
    console.log(req.body);
    res.redirect('/main');
    // Connection.findOneAndDelete();

    // Connection.create(connectionData);

    // console.log("RESPONSE: ", response);
    // res.redirect(303, '/main');
});


// const token = 'Bearer ' + response.access_token;
// console.log(token);
// const newUrl = 'https://api.workspot.com/v1.0/pools';
// const newOptions = {
//     method: 'get',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: token,
//         // 'Cache-Control': 'no-cache',
//     }
//     // body:`grant_type=password&username=${req.body.username}&password=${req.body.password}`,   
// }

// const pools = await fetch(newUrl, newOptions)
//     .then(res => res.json())
//     .catch(e => {
//         console.error({
//             "message": "double noes",
//             error: e,
//         });
//     });
//     console.log("The pools are: ", pools);
//     res.json(pools);


module.exports = router;