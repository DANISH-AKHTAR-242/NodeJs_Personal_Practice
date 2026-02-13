const jwt = require("jsonwebtoken");

function adminCheckMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(401).send("you are not authorized to access this page");
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    if (!user.isAdmin) {
      return res.status(403).send("You are not an admin");
    }
    req.user = user;
    next();
  });
}

module.exports = adminCheckMiddleware;
