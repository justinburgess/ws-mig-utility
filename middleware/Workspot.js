"use strict";

const fetch = require('node-fetch');
const Connection = require('../models/Connection');

class wsConnection {
    constructor() {
        // this.token = this.obtainToken()
    }

    async connectionExists(connectionName) {
        if (Connection.findOne(connectionName)) {
            return true
        }
        return false
    }

    // async setApiCreds(connectionName, admin, password, clientId, clientSecret){
    //     const connectionData = {
    //         connectionName,
    //         apiAdmin,
    //         apiAdminPassword,
    //         wsClientId,
    //         wsClientSecret,
    //     }
    //     Connection.create(connectionData);
    //     return
    // }

    // // helper functions
    // async obtainToken(admin, password, clientId, clientSecret) {
    //     const clientPair = clientId + ':' + clientSecret;
    //     const basicAuth = "Basic " + new Buffer.from(clientPair).toString('base64');
        
    //     let url = 'https://api.workspot.com/oauth/token';
    //     let options = {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             Authorization: basicAuth,
    //             // 'Cache-Control': 'no-cache',
    //         },
    //         body:`grant_type=password&username=${admin}&password=${password}`,   
    //     }

    //     const response = await fetch(url, options)
    //                             .then(res => res.json())
    //                             .catch(e => {
    //                                 console.error({
    //                                     "message": "An error occurred when obtaining the Workspot token.",
    //                                     error: e,
    //                                 });
    //                             });
    //     return response;
}

async function Workspot() {
    const ws = new wsConnection();
    return
}


module.exports = Workspot;
