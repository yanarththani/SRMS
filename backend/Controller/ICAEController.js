const ICAMarks = require('../Models/ICAEModel');

// Controller methods
exports.addICAMarks = async (req, res) => {
  try {
    const { regNo, course, ica01, ica02, ica03 } = req.body;

    // Find the course document
    let courseDoc = await ICAMarks.findOne({ course });

    if (courseDoc) {
      // Check if a record with the same registration number already exists within the course
      const existingMark = courseDoc.marks.find(mark => mark.regNo === regNo);

      if (existingMark) {
        // Update the existing student's marks
        existingMark.ica01 = ica01;
        existingMark.ica02 = ica02;
        existingMark.ica03 = ica03;
      } else {
        // Add new student's marks to the marks array
        courseDoc.marks.push({ regNo, ica01, ica02, ica03 });
      }

      await courseDoc.save(); // Save the updated course document
      res.status(200).json({ message: 'ICAMarks updated successfully' });
    } else {
      // Create a new course document if it doesn't exist
      const newCourse = new ICAMarks({
        course,
        marks: [{ regNo, ica01, ica02, ica03 }]
      });

      await newCourse.save(); // Save the new course document
      res.status(201).json({ message: 'ICAMarks added successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getICAMarksByCourse = async (req, res) => {
  try {
    const { course } = req.params;
    // Fetch marks from the database based on the course
    const icamarks = await ICAMarks.findOne({ course });
    if (!icamarks) {
      return res.status(404).json({ message: 'No marks found for the specified course' });
    }
    res.status(200).json(icamarks.marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateICAMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const { regNo, course, ica01, ica02, ica03, totalMarks, averageMarks } = req.body;
    const updatedICAMarks = {
      regNo,
      course,
      ica01,
      ica02,
      ica03,
      totalMarks,
      averageMarks
    };
    const icamarks = await ICAMarks.findByIdAndUpdate(id, updatedICAMarks, { new: true });
    if (!icamarks) {
      return res.status(404).json({ message: 'ICAMarks not found' });
    }
    res.status(200).json({ message: 'ICAMarks updated successfully', icamarks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteICAMarks = async (req, res) => {
  try {
    const { regNo } = req.params;
    let courseDoc = await ICAMarks.findOne({ 'marks.regNo': regNo });

    if (!courseDoc) {
      return res.status(404).json({ message: 'ICAMarks not found' });
    }

    // Filter out the marks of the student with the given registration number
    courseDoc.marks = courseDoc.marks.filter(mark => mark.regNo !== regNo);
    await courseDoc.save();

    res.status(200).json({ message: 'Student marks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};