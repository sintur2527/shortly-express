const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  req.session = {};
  console.log('req.session :', req);
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create().then(result => {
      console.log('result :', result);
      req.session = result;
    });
  }

  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

exports.checkUser = (req, res, next) => {
  if (models.Sessions.isLoggedIn) {
    res.render('index');
  } else {
    res.redirect('login');
  }
  next();
};

// exports.userExists = (req, res, next) => {

//   next();
// };
