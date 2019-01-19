const axios = require('axios');
const router = require('express').Router();
const controller = require('./imdbController');

router.route('/:actor1name')
    .get(controller.get);

// router.route('/:actorname')
//     .get(controller.get);

// router.route('/all')
//     .get(controller.getAll);

//URL using "/api/"
// router.get('/:actor1name', function(req, res) {
//     const actor1name = req.params.actor1name;
//     // res.send("Hello");
//     return axios.get("https://api.hillbillysoftware.com/Cast/ActorBySearch/f729ded5449c4e9f9f337b2902482c73/" + actor1name)
//         .then(response => {
//             console.log(response.data);
//             res.json(response.data);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// });

module.exports = router;