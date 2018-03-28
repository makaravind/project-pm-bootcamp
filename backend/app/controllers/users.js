var express = require('express');
var router = express.Router();

module.exports = (app) => {
  app.use('/api/users', router);
};

/* GET users listing.  /users/suggestions   */

router.get('/suggestions', function (req, res, next) {

  var users = [
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
  ];

  res.json({
    data: users,
    error: null,
    extra: 'Success'
  });
  res.end();
});
