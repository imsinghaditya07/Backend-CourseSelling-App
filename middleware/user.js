const jwt = require("jsonwebtoken")
const { JWT_USER_PASS } = require("../config")


function middlewareUser(req, res, next){
    const token = red.header.token
    const decoded = jwt.verify(token, JWT_USER_PASS)

    if(decoded){
        red.userId = decoded.id
        next()
    }else{
        res.status(403).json({message: "User Access Only"})
    }

}

module.exports = {
    middlewareUser: middlewareUser,
}