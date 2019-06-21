const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {};

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
