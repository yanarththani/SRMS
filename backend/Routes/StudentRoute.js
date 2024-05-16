const express = require('express');
const router = express.Router();
const studentController = require('../Controller/StudentController');

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

module.exports = router;
