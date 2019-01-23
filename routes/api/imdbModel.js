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
    }
},
{ collection : 'names'});

module.exports = mongoose.model('Name', NameSchema);