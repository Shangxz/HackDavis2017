// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1794300737451867', // App ID
        'clientSecret'    : '117b93f07d775a439530d28829a1d5de', // App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'wBSVrB73NDxRYzhgcQe7vRHnz',
        'consumerSecret'     : 'gt6L04PqVL93wX5LDdPSU9joq7CDKWrhaZQjVG9dachRFmoYsq',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '988768734334-0t7n5e30di8voon0damfba7043oiqftg.apps.googleusercontent.com',
        'clientSecret'     : '0yYB0j7NWwGKJmldJEAMjjkk',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
