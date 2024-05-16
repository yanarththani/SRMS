const Subject = require('../Models/SubjectModel');

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json({
      status: 'success',
      data: {
        subject
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({
      status: 'success',
      data: {
        subjects
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.getSubjectsByLecturer = async (req, res) => {
  const { lecturerName } = req.query;

  try {
    const subjects = await Subject.find({ inCharge: lecturerName });
    // Extracting only the required fields (name and code) from the subjects
    const subjectData = subjects.map(subject => ({
      name: subject.name,
      code: subject.code
    }));
    res.json(subjectData);
  } catch (error) {
    console.error('Error fetching subjects:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
