function authMiddleware (req, res, next) {
    const header =  req.headers;
    const authorization = header.authorization;
    if(authorization === "1234") {
        next();
    } else {
        res.status(401).send("you are not authorized to access this page");
    }
}

module.exports = authMiddleware;