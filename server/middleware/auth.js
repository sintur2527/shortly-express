const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    req.session = {};
    models.Sessions.create()
      .then(results => {
        return models.Sessions.get({ id: results.insertId });
      })
      .then(session => {
        req.session = { hash: session.hash };
        res.cookie(`shortlyid`, session.hash);
        next();
      })
      .catch(err => {
        console.error(err);

        next();
      });
  } else {
    console.log('req.session :', req.session);
    models.Sessions.get({ hash: req.cookies.shortlyid })
      .then(result => {
        //console.log(result.user);
        req.session = {
          hash: result.hash,
          userId: result.userId,
          username: ''
        };
        return models.Users.get({ id: result.userId });
      })
      .then(user => {
        req.session.username = user.username;
        next();
      })
      .catch(err => {
        console.error(err);
        next();
      });
  }
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
