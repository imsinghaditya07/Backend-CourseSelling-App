const { Router } = require("express");
const { middlewareUser } = require("../middleware/user");
const { supabase } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", middlewareUser, async function (req, res) {
    const userId = req.userId
    const courseId = req.body.courseId

    const { data: course } = await supabase.from('course').select('id').eq('id', courseId).single()
    if (!course) {
        return res.status(404).json({ message: "Course not found" })
    }

    const { error } = await supabase.from('purchase').insert([{
        userId,
        courseId
    }])

    if (error) {
        return res.status(500).json({ message: "Database Error" })
    }

    res.json({ message: "You have successfully purchased the course" })
})

courseRouter.get("/preview", async (req, res) => {

    const { data: courses, error } = await supabase.from('course').select('*')
    if (error) {
        return res.status(500).json({ message: "Database Error" })
    }

    res.json({
        courses
    })
})


module.exports = {
    courseRouter: courseRouter,
}