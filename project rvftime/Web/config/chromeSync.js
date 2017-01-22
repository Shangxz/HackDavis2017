var Chrome       = require('../app/models/chrome');

module.exports = {
    syncChromeData: function(req, callback) {
        console.log("CHROME HAPPENING");
        process.nextTick(function() {
            if (!req.syncData.userChromeId || req.syncData.userChromeId == '') {
                
            } else {
                Chrome.findOne({ '_id' :  req.syncData.userChromeId }, function(err, chrome) {
                    if (err)
                        return err;

                    if (chrome) {
                        console.log("PREPARE CHROME SYNC");
                        for (var i = 0; i < req.syncData.history.length; i++) {
                            chrome.history.push(req.syncData.history[i]);
                        }
                        
                        chrome.save(function(err) {
                            if (err)
                                return err;
                            
                            callback();
                            console.log("FINISH CHROME SYNC");
                        });
                    } else {
                        var newChromeUser       = new Chrome();

                        newChromeUser._id    = req.syncData.userChromeId;
                        newChromeUser.save(function(err) {
                            if (err)
                                return err;
                        });
                    }

                });
            }
        })
    }

}