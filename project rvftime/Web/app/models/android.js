var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var androidSchema = mongoose.Schema({

    history : [
        {
        pageName: String,
        pageAddress: String,
        pageNumber: Number,
        startDate: Date,
        // finishDate: Date,  hard to decide when it stopped
        concurrent: Boolean,
        device: String,
        originSource: String,
        muted: Boolean,
        meta: {
            isFlagged: Boolean
        }
    }]

});

module.exports = mongoose.model('Android', androidSchema);
