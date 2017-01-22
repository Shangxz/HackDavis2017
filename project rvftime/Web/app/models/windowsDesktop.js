var mongoose = require('mongoose');

var windowsDesktopSchema = mongoose.Schema({
    history : [{
        windows: [
            {
                title: String,
                id: Number,
                isActive: Boolean
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

module.exports = mongoose.model('WindowsDesktop', windowsDesktopSchema);
