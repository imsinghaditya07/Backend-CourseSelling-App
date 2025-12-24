require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { courseRouter } = require('./Routes/courses')
const { userRouter } = require('./Routes/user')
const { adminRouter } = require('./Routes/admin')
const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to DB")
    app.listen(3000)
}

main()
