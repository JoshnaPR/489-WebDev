function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};
function isAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.status(403).send('Admins only!');
};

module.exports = { isLoggedIn, isAdmin };