const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const passport = require('passport');
const UserModel = mongoose.model('User');
const ChatModel = mongoose.model('Chat');

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
    res.redirect('/');
  });

router.get('/account', ensureAuthenticated, function (req, res) {
  res.json({user: req.user});
});

router.get('/getCurrentSession', function (req, res, next) {
  const sessionObj = {user: null};
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
  const currentUserID = req.session.user.id;
  UserModel.find({id: currentUserID}, function (err, users) {
    const me = users[0];
    const dislikeUserIds = [];
    me.dislikes.forEach(d => dislikeUserIds.push(d.userId));

    const matchesUserIds = [];
    me.matches.forEach(d => matchesUserIds.push(d.userId));
    const filter = [currentUserID, ...dislikeUserIds, ...matchesUserIds];
    UserModel.find({id: {$nin: filter}, businessType: me.lookingBusinessType, experience: {$gte: me.lookingExperience}}, function (err, users) {
      res.json({
        data: users,
        error: null,
        extra: 'Success'
      });
      res.end();
    });
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

router.post('/dislike', function (req, res, next) {

  const currentUserID = req.session.user.id;
  const dislikedUserID = req.body.user;

  console.log('dislikedUserID ', dislikedUserID);

  UserModel.update({id: currentUserID}, {$push: {'dislikes': {userId: dislikedUserID}}}, {safe: true, upsert: true, new: true},
    function (err, model) {
      console.log(err);
      if(!err) {
        res.json({
          data: {},
          error: null,
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

router.post('/messages', function (req, res, next) {
  const currentUserID = req.session.user.id;
  const to = req.body.id;
  ChatModel.find({
    $or : [{'from': currentUserID,'to': to},
    {'from': to,'to': currentUserID}]
  }, function (err, data) {
    if(!err) {
      res.json({
        data: data,
        error: null,
        extra: 'Success'
      });
    } else {
      res.json({
        data: null,
        error: err,
        extra: 'Success'
      });
    }
  });
});

router.get('/chats', function (req, res, next) {
  const currentUserID = req.session.user.id;
  ChatModel.distinct('to',{'from': currentUserID}, function (err, data) {
    // get the chats
    if(!err) {
      UserModel.find({'id': {$in: data}}, {displayName: 1, id: 1, imageUrl: 1, _id: 0}, function (err, data) {
        if (!err) {
          res.json({
            data: data,
            error: null,
            extra: 'Success'
          });
        } else {
          console.error('error getting chats');
          res.json({
            data: null,
            error: err,
            extra: 'Success'
          });
        }
      })

    } else {
      console.error('error getting chats');
      res.json({
        data: null,
        error: err,
        extra: 'Success'
      });
    }
  });
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
