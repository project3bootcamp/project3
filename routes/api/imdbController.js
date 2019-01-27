const Name = require('./imdbModel');
const axios = require('axios');

exports.get = (req, res) => {
    console.log("server get request made!");
    console.log(req.params.actor1name);
    // const search = req.params.id;
    Name.findOne({ primaryName: req.params.actor1name })
        .then(response => {
            console.log("response:");
            console.log(response);
            res.json(response);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMovie = (req, res) => {
    let movieID = req.params.moviesearch;
    axios.get("https://api.themoviedb.org/3/movie/" + movieID + "/external_ids?api_key=c92cdcfa44e3261c741c830802ba0c44")
        .then(response => {
            let imdb_id = response.data.imdb_id;
            console.log(imdb_id);
            res.json(imdb_id);
        });
};

// exports.getAll = (req, res) => {
//     console.log('getAll server request made!');
//     // let allNames = [];
//     Name.find({})
//         .select("primaryName")
//         .limit(50000)
//         .then(response => {
//             // console.log(response);
//             res.json(response);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// };
