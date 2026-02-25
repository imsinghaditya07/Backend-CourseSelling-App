const { Router } = require('express');
const adminRouter = Router();
const { supabase } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { z } = require("zod");
const { middlewareAdmin } = require('../middleware/admin');


adminRouter.post("/signup", async (req, res) => {
    try {
        const bodyreqSchema = z.object({
            email: z.string().email().min(1).max(50),
            password: z.string().min(6).max(20).refine((data) => /[A-Z]/.test(data)),
            firstName: z.string().min(1).max(20),
            lastName: z.string().min(1).max(20)
        })
        const result = bodyreqSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid Request Body" })
        }

        const { email, password, lastName, firstName } = req.body
        const { data: existingUser } = await supabase.from('admin').select('email').eq('email', email).single()

        if (existingUser) {
            return res.status(403).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt);

        const { error } = await supabase.from('admin').insert([
            {
                email,
                password: hashed,
                lastName,
                firstName
            }
        ])

        if (error) {
            console.error(error)
            return res.status(500).json({ message: "Database error" })
        }

        res.status(201).json({ message: "User Register Sucessfully" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal Server Error" })
    }


})

adminRouter.post("/signin", async (req, res) => {
    const bodyreqsigninSchema = z.object({
        email: z.string().email().min(1).max(50),
        password: z.string().min(6).max(20),
    })
    const result = bodyreqsigninSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({ message: "Invalid Request Body" })
    }

    const { email, password } = req.body

    const { data: admin, error } = await supabase.from('admin').select('*').eq('email', email).single()

    if (error || !admin)
        return res.status(404).json({ message: "Invalid Email Or Password" })

    const passcheck = await bcrypt.compare(password, admin.password)
    if (!passcheck) {
        return res.status(401).json({ message: "Invalid Email Or Password" })
    }

    if (admin) {
        const token = jwt.sign({
            id: admin.id, email: email
        }, process.env.JWT_ADMIN_PASS, { expiresIn: '1h' })

        res.json({
            token: token
        })

    } else {
        res.status(403).json({ message: "Incorrect Credential" })
    }



})

adminRouter.post("/course", middlewareAdmin, async (req, res) => {
    try {
        const bodyreqSchema = z.object({
            title: z.string().min(1).max(100),
            description: z.string().min(1).max(1000),
            price: z.number().positive(),
            imageURL: z.string().url().optional()
        })
        const result = bodyreqSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid Request Body" })
        }

        const adminId = req.adminId
        const { title, description, price, imageURL } = req.body

        const { data: course, error } = await supabase.from('course').insert([
            {
                title,
                description,
                price,
                imageUrl: imageURL,
                creatorId: adminId
            }
        ]).select().single()

        if (error) {
            return res.status(500).json({ message: "Database Error", error })
        }

        res.send(
            {
                message: "Course Created Successfully",
                courseId: course.id
            }
        )
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

adminRouter.put("/course", middlewareAdmin, async (req, res) => {
    try {
        const bodyreqSchema = z.object({
            title: z.string().min(1).max(100).optional(),
            description: z.string().min(1).max(1000).optional(),
            price: z.number().positive().optional(),
            imageURL: z.string().url().optional(),
            courseId: z.string()
        })
        const result = bodyreqSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid Request Body" })
        }

        const adminId = req.adminId
        const { title, description, price, imageURL, courseId } = req.body

        const { data: course, error } = await supabase.from('course').update({
            title,
            description,
            price,
            imageUrl: imageURL
        }).eq('id', courseId).eq('creatorId', adminId).select().single()

        if (error) {
            return res.status(500).json({ message: "Database update error" })
        }

        res.send(
            {
                message: "Course Updated Successfully",
                courseId: course.id
            }
        )
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

adminRouter.get("/course/bulk", middlewareAdmin, async (req, res) => {
    const adminId = req.adminId

    const { data: course, error } = await supabase.from('course').select('*').eq('creatorId', adminId)

    if (error) {
        return res.status(500).json({ message: "Database Error" })
    }


    res.send(
        {
            message: "Course Found",
            courseId: course

        }

    )

})


module.exports = {
    adminRouter: adminRouter,
}

