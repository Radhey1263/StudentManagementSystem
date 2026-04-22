const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Define routes
router.post('/', studentController.createStudent);           // CREATE
router.get('/', studentController.getAllStudents);           // READ ALL
router.get('/:id', studentController.getStudentById);        // READ ONE
router.put('/:id', studentController.updateStudent);         // UPDATE
router.delete('/:id', studentController.deleteStudent);      // DELETE

module.exports = router;