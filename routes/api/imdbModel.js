const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameSchema = new Schema({
    nconst: {
        type: String,
        required: true
    },
    primaryName: {
        type: String,
        required: true
    },
    birthYear: {
        type: Number,
        required: false
    },
    deathYear: {
        type: Number,
        required: false
    },
    primaryProfession: {
        type: String,
        required: false
    },
    knownForTitles: {
        type: String,
        required: true
    }
},
{ collection : 'names'});

module.exports = mongoose.model('Name', NameSchema);