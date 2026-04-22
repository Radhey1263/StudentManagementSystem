const Student = require('../models/student');

// CREATE - Add new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// READ - Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// READ - Get single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE - Update student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE - Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};