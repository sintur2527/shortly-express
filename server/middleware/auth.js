const models = require('../models');
const Promise = require('bluebird');

const addCookie = (req, res, next) => {
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
      next();
    });
};

const setCookie = (result, req, res, next) => {
  req.session = {
    hash: result.hash,
    userId: result.userId,
    user: {}
  };
  return models.Users.get({ id: result.userId })
    .then(user => {
      if (user === undefined) {
        next();
      } else {
        console.log(user);
        req.session.user.username = user.username;
        next();
      }
    })
    .catch(err => {
      console.error(error);
      next();
    });
};

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    addCookie(req, res, next);
  } else {
    models.Sessions.get({ hash: req.cookies.shortlyid }).then(result => {
      if (result === undefined) {
        req.cookie = {};
        addCookie(req, res, next);
      } else {
        setCookie(result, req, res, next);
      }
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
