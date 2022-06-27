const monggose = require('mongoose');

const urlSchema = new monggose.Schema({
    fullurl: {
        type: String,
        required: true
    },
    shorturl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //owner id
    owner: {
        type: monggose.Schema.Types.ObjectId,
        default: null
    }
});

//exports
module.exports = monggose.model('Url', urlSchema);