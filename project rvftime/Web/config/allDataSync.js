var User       = require('../app/models/user');
var Chrome       = require('../app/models/chrome');
var WindowsDesktop       = require('../app/models/windowsDesktop');
var queryString = require('querystring');

module.exports = {
    getDataByDate: function(req, callback) {
        console.log("GETTING ALL DATA HAPPENING" + JSON.stringify(req));
        var oQueryParams = queryString.parse(req.replace(/^.*\?/, ''));
        console.log(oQueryParams);
        var resultData = {};
        
        if (!oQueryParams.id || oQueryParams.id == '') {
                return "Account doesn't exist";
        } else {
                User.findOne({ '_id' : oQueryParams.id }, function(err, User) {
                    if (err)
                        return err;
                    if (User) {
                        resultData.userInfo = User;
                        console.log("Find User Data" + User);
                        Chrome.findOne({ '_id' : User.local._chromeData }, function(err, Chrome) {
                            if (err)
                                return err;

                            if (Chrome) {
                                resultData.chromeInfo = Chrome;
                                console.log("Find Chrome Data " + Chrome.history[0]);
                                //return Chrome;
                                callback(resultData);
                                // Chrome.history.find({"startDate": {'$gte': new Date('1/1/2016'), '$lt': new Date('2/18/2016')}}, function(err, History) {
                                //     if (err)
                                //         return err;
                                    
                                //     console.log("SUCCESS" + History);                                    
                                // });
                            }
                               

                        });
                
                        
                    } else {
                        return "false";
                    }

                });
                
            }
    }

}