const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASS } = require("../config")


function middlewareAdmin(req, res, next) {
    const token = req.headers.token
    if (!token) {
        return res.status(403).json({ message: "Token not found" })
    }
    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASS)

        if (decoded) {
            req.adminId = decoded.id
            next()
        } else {
            res.status(403).json({ message: "Admin Access Only" })
        }
    } catch (err) {
        res.status(403).json({ message: "Admin Access Only / Invalid Token" })
    }

}

module.exports = {
    middlewareAdmin: middlewareAdmin,
}