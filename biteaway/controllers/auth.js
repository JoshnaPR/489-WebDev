function isLoggedIn(req, res, next) {
    if (req.session.userId) return next();
    return res.redirect('/login');
  }
  
function isAdmin(req, res, next) {
    if (req.session.isAdmin) return next();
    return res.status(403).send('Admins only!');
  }
  
module.exports = { isLoggedIn, isAdmin };
  