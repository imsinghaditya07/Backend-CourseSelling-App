const express = require('express')
const mongoose = require('mongoose')
const {courseRouter} = require('./Routes/courses')
const {userRouter} = require('./Routes/user')
const {adminRouter} = require('./Routes/admin')
const app = express()

app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)


async function main () {
    await mongoose.connect('mongodb+srv://Rauneetsingh:qXQ9Mjzd4zo6j6tn@cluster0.zlc1jqd.mongodb.net/course-app')
    console.log("Connected to DB")
    app.listen(3000) 
}

main()
