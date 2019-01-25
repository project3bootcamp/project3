const axios = require('axios');
const router = require('express').Router();
const controller = require('./imdbController');

router.route('/:actor1name')
    .get(controller.get);

// router.route('/')
//     .get(controller.getAll);

module.exports = router;