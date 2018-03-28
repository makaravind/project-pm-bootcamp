const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const passport = require('passport');

module.exports = (app) => {
  app.use('/api/auth', router);
};

router.get('/linkedin',
  passport.authenticate('linkedin', {state: 'SOMESTATE'}),
  function (req, res) {
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
  });

router.get('/linkedin/callback',
  passport.authenticate('linkedin', {failureRedirect: '/login'}),
  function (req, res) {
    console.log('--------------------called back.... ', req.session.user);
    // var old = req.session;
    // // if(!err) {
    //   req.session.isAdmin = true;
    // // }
    res.redirect('/');
  });

router.get('/account', ensureAuthenticated, function (req, res) {
  res.json({user: req.user});
});

router.get('/getCurrentSession', function (req, res, next) {
  const sessionObj = {user: null};
  console.log('req.session', req.session);
  if (req.session && req.session.user) {
    sessionObj.user = req.session.user;
  }
  res.json(sessionObj)
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
