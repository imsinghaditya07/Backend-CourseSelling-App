const { Router } = require("express");
const userRouter = Router();

userRouter.get("/purchases", (req,res) => {
    res.json({
        message: "endpoint for user purchases"
    })
})
userRouter.post("/signup", (req,res) => {
    res.json({
        message: "endpoint for user signup"
    })
})
userRouter.post("/signin", (req,res) => {
    res.json({
        message: "endpoint for user signin"
    })
})


module.exports = {
    userRouter: userRouter,
}