const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '\\app\\views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  var originsWhitelist = [
    'http://localhost:3000',
  ];
  var corsOptions = {
    origin: function(origin, callback){
      console.log('cors called ');
      var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
      callback(null, isWhitelisted);
    },
    credentials:true
  }
  app.use(cors(corsOptions));
 /* app.all('/!*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/app/views'));
  app.use(methodOverride());

  app.use(session({secret: 'keyboard cat'}));
  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(new LinkedinStrategy({
      clientID: config.LINKEDIN_CLIENT_ID,
      clientSecret: config.LINKEDIN_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/api/auth/linkedin/callback",
      scope: ['r_basicprofile', 'r_emailaddress'],
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      console.log('logged in...');
      req.session.accessToken = accessToken;
      process.nextTick(function () {
        // To keep the example simple, the user's Linkedin profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Linkedin account with a user record in your database,
        // and return that user instead.
        // return done(null, profile);

        UserModel.findOne({'id': profile.id}, function (err, person) {
          if (err) {
            return handleError(err);
          } else {
            if (person) {
              req.session.user = person;
              console.log('login successfull, user already present');
              return done(err, person);
            } else {
              var user = new UserModel({
                id: profile.id,
                displayName: profile.displayName,
                name: {
                  familyName: profile.name.familyName,
                  givenName: profile.name.givenName
                },
                email: profile._json.emailAddress,
                imageUrl: profile.photos[0].value,
                provider: profile.provider,
                providerData: profile._json,
                profileUrl: profile._json.publicProfileUrl,
                industry: profile._json.industry,
                numConnections: profile._json.numConnections
              });
              console.log('authenticated and created a new user');
              user.save(function (err, data) {
                req.session.user = data;
                return done(err, data);
              })
            }
          }
        });
      });
    }
  ));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      /*res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });*/
      res.json({
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });*/
    res.json({
      message: err.message,
      error: err,
      title: 'error'
    });
  });

  return app;
};
