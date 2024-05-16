const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
  year: String,
  semester:String
});

const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);

module.exports = AcademicYear;
