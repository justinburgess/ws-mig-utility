const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


// workspot dashboard screen
router.get('/', async (req, res, next) => {
    const apiToken = '76dea631-11fe-46ec-9941-a6321d25cbf3'
    const url = `https://api.workspot.com/v1.0/pools?access_token=${apiToken}`
    const desktopPools = await fetch(url)
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))

    console.log(desktopPools);
    res.render('dashboard', {desktopPools: desktopPools.desktopPools});
});

module.exports = router;