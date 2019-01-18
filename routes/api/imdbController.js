const Name = require('./imdbModel');

exports.get = (req, res) => {
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

exports.getAll = (req, res) => {
    Name.find({})
        .then(response => {
            res.json(response)
        });
};