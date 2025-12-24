const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASS } = require("../config")


function middlewareAdmin(req, res, next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_ADMIN_PASS)

    if(decoded){
        req.adminId = decoded.id
        next()
    }else{
        res.status(403).json({message: "Admin Access Only"})
    }

}

module.exports = {
    middlewareAdmin: middlewareAdmin,
}