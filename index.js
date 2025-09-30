const express = require('express')
const {courseRouter} = require('./Routes/courses')
const {userRouter} = require('./Routes/user')
const {adminRouter} = require('./Routes/admin')
const app = express()


app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)


app.listen(3000) 