var chromeDataService = require('../config/chromeSync.js');
var windowsDesktopDataService = require('../config/windowsDesktopSync.js');
var iOSSyncService = require('../config/iOSSync.js');

var allDataSyncService = require('../config/allDataSync.js');


module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.send('loginMessage');
    });

    // PROFILE SECTION =========================
    // app.get('/home', isLoggedIn, function(req, res) {
    //     res.send('loginMessage');
    //     /*res.render('profile.ejs', {
    //         user : req.user
    //     });*/
    // });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


//-----------------------------
// Get all the data
//------------------------------
    
    app.get('/allDataSync', function (req, res, next) {
        console.log(req.url);
        
        allDataSyncService.getDataByDate(req.url, function(response) {
            console.log("Got response ");
            req.body = response;
            next();
        });
        
    },function (req, res, next) {
        console.log("finish route "+ req.body);
        res.send(req.body);
      
    }
    
    );
    
//---------------------------------
// Chrome Extension sync data     |
//---------------------------------
    app.post('/chromeSync', function (req, res) {
        console.log(req.body);
        chromeDataService.syncChromeData(req.body, function() {
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        });
    });
    
//---------------------------------------
// Windows Desktop Software sync data   |
//---------------------------------------
    app.post('/windowsDesktopSync', function (req, res) {
        console.log(req.body);
        windowsDesktopDataService.syncWindowsDesktopData(req.body, function() {
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        });
    });
    
//------------------------------
// iOS sync data               |
//------------------------------
    app.post('/iOSSync', function (req, res) {
        console.log(req.body);
        iOSSyncService.syncIOSData(req.body, function() {
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        });
    });


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.status(400).send('Current password does not match');
        });
        
        app.get('/home', isLoggedIn, function(req, res) {
            console.log("USER INFO IS " + req.user);
            res.send(req.user); 
        });


        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.send('SignupPage');

        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.send('loginMessage');
            //res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        
        
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
