const jwt = require("jsonwebtoken")
const { JWT_USER_PASS } = require("../config")


function middlewareUser(req, res, next) {
    const token = req.headers.token
    if (!token) {
        return res.status(403).json({ success: false, message: "Token not found" })
    }
    try {
        const decoded = jwt.verify(token, JWT_USER_PASS)

        if (decoded) {
            req.userId = decoded.id
            next()
        } else {
            res.status(403).json({ success: false, message: "User Access Only" })
        }
    } catch (err) {
        res.status(403).json({ success: false, message: "User Access Only / Invalid Token" })
    }

}

module.exports = {
    middlewareUser: middlewareUser,
}