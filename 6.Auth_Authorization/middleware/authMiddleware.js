const jwt = require('jsonwebtoken');

function authMiddleware (req, res, next) {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];
    if (!token) {
        return res.status(401).send("you are not authorized to access this page");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        req.user = user;
        next();
    });
}



module.exports = authMiddleware;