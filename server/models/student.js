const mongoose = require('mongoose');

// Define Student Schema
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create and export model
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;