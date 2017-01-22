var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var chromeSchema = mongoose.Schema({
    history : [{
        pages: [
            {
                title: String,
                url: String,
                number: Number,
                audible: Boolean,
                isPinned: Boolean
            }
        ],
        startDate: Date,
        // finishDate: Date,  hard to decide when it stopped
        // concurrent: Boolean,
        device: String,
        originSource: String,
        meta: {
            comments: [{ body: String, date: Date }]
        }
    }]

});

module.exports = mongoose.model('Chrome', chromeSchema);
