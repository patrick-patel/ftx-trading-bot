const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    var cookiesArray = req.headers.cookie.split(';');
    req.cookies = {};
    cookiesArray.forEach((element, index) => {
      var cookie = element.split('=');
      if (index > 0) {
        cookie[0] = cookie[0].substring(1);
      }
      req.cookies[cookie[0]] = cookie[1];
    });
  }
  next();
  // next(req.cookies)
};
//access the cookies on an incoming request, parse them into an object, and assign this object to a cookies property on the request
module.exports = parseCookies;
