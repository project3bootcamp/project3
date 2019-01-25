const axios = require('axios');
const router = require('express').Router();
const controller = require('./imdbController');

router.route('/:moviesearch')
    .get(controller.getMovie);

// router.route('/')
//     .get(controller.getAll);

module.exports = router;