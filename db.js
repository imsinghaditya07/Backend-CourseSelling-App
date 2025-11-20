const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
})
const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId, // FIXME: Missing 'ref: "admin"' to enable population


})
const purchaseSchema = new Schema({
    userId: ObjectId, // FIXME: Missing 'ref: "user"'
    courseId: ObjectId, // FIXME: Missing 'ref: "course"'

})

const userModel = mongoose.model('user', userSchema)
const adminModel = mongoose.model('admin', adminSchema)
const purchaseModel = mongoose.model('purchase', purchaseSchema)
const courseModel = mongoose.model('course', courseSchema)

module.exports = {
    userModel,
    adminModel,
    purchaseModel,
    courseModel
}