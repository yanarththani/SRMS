const AcademicYear = require('../models/AcademicYear');

exports.addAcademicYear = async (req, res) => {
  // Check if user is admin (You can implement authentication and authorization here)
  const userRole = 'admin'; // For demo purposes, assume user is admin
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { year } = req.body;

  try {
    const academicYear = new AcademicYear({ year });
    await academicYear.save();
    res.status(201).json({ message: 'Academic year added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAcademicYears = async (req, res) => {
  try {
    const academicYears = await AcademicYear.find();
    res.json(academicYears);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
