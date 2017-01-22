var mongoose = require('mongoose');

var iOSSchema = mongoose.Schema({
    history : [{
        apps: [
            {
                title: String
            }
        ],
        pebbleMessage : String,
        isPebble : Boolean,
        startDate: Date,
        device: String,
        originSource: String,
        meta: {
            comments: [{ body: String, date: Date }]
        }
    }]

});

module.exports = mongoose.model('IOS', iOSSchema);
