const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const passport = require('passport');
const UserModel = mongoose.model('User');

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

router.get('/suggestions', function (req, res, next) {

  /*var users = [
    {
      fisrtName: 'Pawan',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',

    },
    {
      fisrtName: 'Aravind',
      about: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\'',
    },
    {
      fisrtName: 'Shankar',
      about: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
    }
  ];*/
  const currentUserID = req.session.user.id;
  UserModel.find({id: {$ne: currentUserID}}, function (err, users) {
    res.json({
      data: users,
      error: null,
      extra: 'Success'
    });
    res.end();
  });
});

router.post('/like', function (req, res, next) {

  const currentUserID = req.session.user.id;
  const likedUserID = req.body.user;

  console.log('likedUserID ', likedUserID);

  // step 1: Add to my likes
  UserModel.update({id: currentUserID}, {$push: {'likes': {userId: likedUserID}}}, {safe: true, upsert: true, new: true},
    function (err, model) {
      console.log(err);
      if(!err) {
        checkMatchPolicy(currentUserID, likedUserID, req, res);
      } else {
        res.json({
          data: {},
          error: err,
          extra: 'Success'
        })
      }
    });
});

function checkMatchPolicy(currentUserID, likedUserID, req, res) {
  // step 2: check in likedUserID person likes, if present add to matches else do nothing
  UserModel.find({id: likedUserID, "likes.userId": currentUserID}, function (err, users) {
    if(users.length > 0) {
      // add to matches
      UserModel.update({id: currentUserID}, {$push: {'matches': {userId: likedUserID}}}, {
        safe: true,
        upsert: true,
        new: true
      }, function (err, model) {
        if(!err) {
          UserModel.update({id: likedUserID}, {$push: {'matches': {userId: currentUserID}}}, {
            safe: true,
            upsert: true,
            new: true
          }, function () {
            if(!err) {
              res.json({
                data: {
                  status: 'matched'
                },
                error: err,
                extra: 'Success'
              })
            }
          });
        } else {
          res.json({
            data: {},
            error: err,
            extra: 'Success'
          })
        }
      });
    } else {
      res.json({
        data: {
          status: 'pending'
        },
        error: err,
        extra: 'Success'
      })
    }
  });
}

router.get('/matches', function (req, res, next) {
  const currentUserID = req.session.user.id;
  UserModel.find({id: currentUserID}, function (err, user) {
    const _user = user[0];
    const matches = [];
    _user.matches.forEach(_u => matches.push(_u.userId));
    if(!err) {
      UserModel.find({'id': {$in: matches}}, function (err, users) {
        res.json({
          data: users,
          error: null,
          extra: 'Success'
        })
      })
    } else {
      res.json({
        data: {},
        error: err,
        extra: 'Success'
      })
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
