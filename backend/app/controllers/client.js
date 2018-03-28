const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const passport = require('passport');

module.exports = (app) => {
  app.use('/', router);
};

router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
