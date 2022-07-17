const fetch = require('node-fetch');


// helper functions
const getToken = async function (admin, password, clientId, clientSecret) {
    const clientPair = clientId + ':' + clientSecret;
    const basicAuth = "Basic " + new Buffer.from(clientPair).toString('base64');
    
    let url = 'https://api.workspot.com/oauth/token';
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: basicAuth,
        },
        body:`grant_type=password&username=${admin}&password=${password}`,   
    }

    const response = await fetch(url, options)
                            .then(res => res.json())
                            .catch(e => {
                                console.error({
                                    "message": "An error occurred when obtaining the Workspot token.",
                                    error: e,
                                });
                            });
    return response;
}

module.exports = getToken;