// controllers/finalMarkController.js
const FinalMark = require('../Models/FinalMarksModel');

exports.addFinalMarks = async (req, res) => {
  try {
    const { regNo, q1, q2, q3, q4, q5, totalMarks, averageMarks } = req.body;
    const finalMark = new FinalMark({ regNo, q1, q2, q3, q4, q5, totalMarks, averageMarks });
    await finalMark.save();
    res.status(201).json({ message: 'Student marks added successfully' });
  } catch (error) {
    console.error('Error adding final marks:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.viewFinalMarks = async (req, res) => {
  try {
    const finalMarks = await FinalMark.find();
    res.status(200).json(finalMarks);
  } catch (error) {
    console.error('Error retrieving final marks:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
