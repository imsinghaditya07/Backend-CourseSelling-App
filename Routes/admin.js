const { Router } = require('express');
const adminRouter = Router();
const {adminModel} = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { z } = require("zod");
const { middlewareAdmin } = require('../middleware/admin');


adminRouter.post("/signup",async (req,res) => {
try {
    const bodyreqSchema = z.object({
        email: z.string().email().min(1).max(50),
        password: z.string().min(6).max(20).refine((data) => /[A-Z]/.test(data)),
        firstName: z.string().min(1).max(20),
        lastName: z.string().min(1).max(20)
    })
    const result = bodyreqSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({message: "Invalid Request Body"})
    }

    const {email, password ,lastName, firstName} = req.body
    const existingUser = await adminModel.findOne({email})
    if(existingUser){
       return res.status(403).json({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt);

    await adminModel.create({
        email,
        password: hashed,
        lastName,
        firstName
    })
    res.status(201).json({message: "User Register Sucessfully"})
    
} catch(err){
    res.status(500).json({message: "Internal Server Error"})
}


})

adminRouter.post("/signin", async (req,res) => {
    const bodyreqsigninSchema = z.object({
        email: z.string().email().min(1).max(50),
        password: z.string().min(6).max(20),
    })
    const result = bodyreqsigninSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({message: "Invalid Request Body"})
    }

    const {email, password} = req.body

    const admin = await adminModel.findOne({email})
    if(!admin)
       return res.status(404).json({message:"Invalid Email Or Password"})
    
    const passcheck = bcrypt.compare(password, admin.password)
      if (!passcheck){
        return res.status(401).json({message: "Invalid Email Or Password"})
      }

      if (admin){
        const token = jwt.sign({
        id: admin._id, email: email
      },JWT_ADMIN_PASS)

      res.json({
        token: token
      })

      } else {
        res.status(403).json({message: "Incorrect Credential"})
      }


 
})

adminRouter.post("/course", middlewareAdmin, async (req,res) => {
    const adminId = req.adminId

    const {title, description, price,imageURL} = req.body

    const course = await courseModel.create({
        title,
        description,
        price,
        imageURL, 
        creatorId: adminId
    })

    res.send(
        {
            message: "Course Created Successfully",
            courseId: course._id

        }
        
    )

    
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

