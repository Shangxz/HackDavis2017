var WindowsDesktop       = require('../app/models/windowsDesktop');

module.exports = {
    syncWindowsDesktopData: function(req, callback) {
        console.log("WINDOWS DESKTOP HAPPENING" + JSON.stringify(req));
        process.nextTick(function() {
            if (!req.userWindowsDesktopId || req.userWindowsDesktopId == '') {
                
            } else {
                WindowsDesktop.findOne({ '_id' :  req.userWindowsDesktopId }, function(err, WindowsDesktop) {
                    // if there are any errors, return the error
                    if (err)
                        return err;

                    // check to see if theres already a user with that email
                    if (WindowsDesktop) {
                        console.log("PREPARE WD SYNC" + JSON.stringify(req.history));
                        for (var i = 0; i < req.history.length; i++) {
                            WindowsDesktop.history.push(req.history[i]);
                        }
                        
                        WindowsDesktop.save(function(err) {
                        });
                        console.log("FINISH WD SYNC");
                        callback();
                    } else {
                        var newWindowsDesktopUser       = new WindowsDesktop();
                        newWindowsDesktopUser._id    = req.newWindowsDesktopUser;
                        newWindowsDesktopUser.save(function(err) {
                        });
                    }

                });
            }
        })
    }

}