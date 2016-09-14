const passport = require('koa-passport');

const User = require('./models/user.js');

User.findOne({ username: 'test' }, function (err, testUser) {
  if (!testUser) {
    console.log('test user did not exist; creating test user...');
    testUser = new User({
      username: 'test',
      password: 'test'
    });
    testUser.save();
  }
});

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username, password: password }, done);
}));

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ facebook_id: profile.id }, done);
  }
));

const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ twitter_id: profile.id }, done);
  }
));
//1037364594283-qi4v3998e48lj4bbfcedb9atactfbgv4.apps.googleusercontent.com
//Hj2pe3MBj3Ba2syrWQSH_mTb
const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: '1037364594283-qi4v3998e48lj4bbfcedb9atactfbgv4.apps.googleusercontent.com',
    clientSecret: 'Hj2pe3MBj3Ba2syrWQSH_mTb',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3070) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    console.log('getting user' ,profile);
    User.findOne({ google_id: profile.id }, function(err, result){
        console.log('user.find', err, result);
        if(err) {
          done(err);
        } else {
          if(result === null) {
            var newUser = new User({
              username: profile.emails[0].value,
              email: profile.emails[0].value,
              displayName: profile.displayName,
              firstName: (profile.name && profile.name.givenName) ? profile.name.givenName : '' ,
              lastName: (profile.name && profile.name.familyName) ? profile.name.familyName : '' ,
              google_id: profile.id
            });
            console.log('newUser', newUser);
            newUser.save(done);
          } else {
            console.log('GotUser');
             done(err,result);
          }
        }
    });
  }
));
