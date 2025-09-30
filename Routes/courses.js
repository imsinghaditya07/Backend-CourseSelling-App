const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", (req,res) => {
    res.json({
        message: "endpoint for user course purchase"
    })
})

courseRouter.get("/preview", (req,res) => {
    res.json({
        message: "endpoint for user courses"
    })
})


module.exports = {
    courseRouter: courseRouter, 
}