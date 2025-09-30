const { Router } = require('express');
const adminRouter = Router();

adminRouter.post("/signup", (req,res) => {
    res.json({
        message: "endpoint for user signup"
    })
})

adminRouter.post("/signin", (req,res) => {
    res.json({
        message: "endpoint for user signin"
    })
})

adminRouter.post("/course", (req,res) => {
    res.json({
        message: "endpoint for user signin"
    })
})

adminRouter.put("/course", (req,res) => {
    res.json({
        message: "endpoint for user signin"
    })
})

adminRouter.get("/course/bulk", (req,res) => {
    res.json({
        message: "endpoint for user signin"
    })
}) 


module.exports = {
    adminRouter: adminRouter,
}

