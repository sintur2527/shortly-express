const parseCookies = (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    req.cookies = {};
    var reqCookie = req.headers.cookie;
    let semicolon = reqCookie.split('; ');
    let cookie = [];
    for (let i = 0; i < semicolon.length; i++) {
      cookie.push(semicolon[i].split('='));
    }

    for (let j = 0; j < cookie.length; j++) {
      req.cookies[cookie[j][0]] = cookie[j][1];
    }
  } else {
    req.cookies = {};
  }
  next();
};

module.exports = parseCookies;
