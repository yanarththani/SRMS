const express = require('express');
const router = express.Router();
const academicYearController = require('../Controller/academicYearController');

router.post('/', academicYearController.addAcademicYear);
router.get('/', academicYearController.getAcademicYears);

module.exports = router;
