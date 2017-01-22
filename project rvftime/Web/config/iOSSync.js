var IOS       = require('../app/models/iOS');

module.exports = {
    syncIOSData: function(req, callback) {
        console.log("IOS HAPPENING");
        process.nextTick(function() {
            if (!req.userIOSId || req.userIOSId == '') {
                
            } else {
                IOS.findOne({ '_id' :  req.userIOSId }, function(err, iOS) {
                    if (err)
                        return err;

                    if (iOS) {
                        console.log("PREPARE IOS SYNC");
                        for (var i = 0; i < req.history.length; i++) {
                            iOS.history.push(req.history[i]);
                        }
                        
                        iOS.save(function(err) {
                            if (err)
                                return err;
                            
                            callback();
                            console.log("FINISH IOS SYNC");
                        });
                    } else {
                        var newIOSUser       = new IOS();
                        newIOSUser._id    = req.userIOSId;
                        newIOSUser.save(function(err) {
                            if (err)
                                return err;
                        });
                    }

                });
            }
        })
    }

}