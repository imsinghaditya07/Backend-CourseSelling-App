require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { courseRouter } = require('./Routes/courses')
const { userRouter } = require('./Routes/user')
const { adminRouter } = require('./Routes/admin')
const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)

// Healthcheck Route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'CourseHub API is running smoothly' });
});

const PORT = process.env.PORT || 3000;

async function main() {
    console.log(`Server connected and starting on port ${PORT}...`)
    app.listen(PORT, () => {
        console.log(`CourseHub API listening on http://localhost:${PORT}`);
    })
}

main()
