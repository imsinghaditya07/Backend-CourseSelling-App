const { Router } = require("express");
const userRouter = Router();
const { supabase } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { z } = require("zod");
const { middlewareUser } = require("../middleware/user");



userRouter.get("/purchases", middlewareUser, async (req, res) => {
  const userId = req.userId
  const { data: purchases, error } = await supabase.from('purchase').select(`
    *,
    course:courseId (*)
  `).eq('userId', userId)

  if (error) {
    return res.status(500).json({ message: "Database Error" })
  }
  res.json({
    purchases
  })
})
// Signup
userRouter.post("/signup", async (req, res) => {
  try {
    const bodyreqSchema = z.object({
      email: z.string().email().min(1).max(50),
      password: z.string().min(6).max(20).refine((data) => /[A-Z]/.test(data), { message: "Password must contain at least one uppercase letter" }),
      firstName: z.string().min(1),
      lastName: z.string().min(1)
    })
    const result = bodyreqSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ message: "Invalid Request Body" })
    }
    const { email, password, lastName, firstName } = req.body

    // Check if user exists
    const { data: existingUser } = await supabase.from('user').select('email').eq('email', email).single()
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt);

    const { error } = await supabase.from('user').insert([{
      email,
      password: hashed,
      lastName,
      firstName
    }])

    if (error) {
      console.error(error)
      return res.status(500).json({ message: "Database Error" })
    }
    res.status(201).json({ message: "User Register Sucessfully" })

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" })
  }

})

//Signin
userRouter.post("/signin", async (req, res) => {
  // Input Validation Using Zod
  const bodyreqsigninSchema = z.object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(6).max(20),
  })
  const result = bodyreqsigninSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Request Body" })
  }
  // Destructuring email and password from req.body
  const { email, password } = req.body
  // Finding User
  const { data: user, error } = await supabase.from('user').select('*').eq('email', email).single()

  // If user doesn't exist OR password doesn't match, send ONE generic error
  if (error || !user)
    return res.status(404).json({ message: "Invalid Email Or Password" })

  const passcheck = await bcrypt.compare(password, user.password)
  if (!passcheck) {
    return res.status(401).json({ message: "Invalid Email Or Password" })
  }
  // Providing JWT Token if user exists and password matches

  if (user) {
    const token = jwt.sign({
      id: user.id, email: email
    }, process.env.JWT_USER_PASS, { expiresIn: '1h' })

    res.json({
      token: token
    })

  } else {
    res.status(403).json({ message: "Incorrect Credential" })
  }

})


module.exports = {
  userRouter: userRouter,
}