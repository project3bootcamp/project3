const axios = require('axios');
const router = require('express').Router();


//URL using "/api/"
router.get('/', function(req, res) {
    // const results;
    // res.send("Hello");
    return axios.get("https://api.hillbillysoftware.com/Cast/ActorBySearch/f729ded5449c4e9f9f337b2902482c73/drew%20carey")
        .then(response => {
            console.log(response.data);
            res.json(response.data);
            // return response.data;
            // res.json(response.data);
            // results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;