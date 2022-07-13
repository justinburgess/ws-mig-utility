const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password');

// use basic authentication
passport.use(new BasicStrategy(
  function(userid, password, done) {
    User.findOne({ username: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

// manage oauth tokens
passport.use(
    new ClientPasswordStrategy(
        function(clientId, clientSecret, done) {
            Clients.findOne({ clientId: clientId }, function (err, client) {
                if (err) { return done(err); }
                if (!client) { return done(null, false); }
                if (client.clientSecret != clientSecret) { return done(null, false); }
                return done(null, client);
            });
        }
    )
);

module.exports = passport; 