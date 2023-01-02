var jwt = require("jsonwebtoken");

function tokenAuthenticate(req, res, next) {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            console.log(err)
            if (err) return res.status(403)
            next();
        });
    } else {
        return res.status(401).send({
            error: "Missing Authorization header"
        });
    }
}

module.exports = {tokenAuthenticate}