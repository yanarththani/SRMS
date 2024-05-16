// icamarksController.js
const ICAMarks = require('../Models/ICAEModel');

// Controller methods
exports.addICAMarks = async (req, res) => {
  try {
    const { regNo, ica01, ica02, ica03, totalMarks, averageMarks } = req.body;
    const icamarks = new ICAMarks({
      regNo,
      ica01,
      ica02,
      ica03,
      totalMarks,
      averageMarks
    });
    await icamarks.save();
    res.status(201).json({ message: 'ICAMarks added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getICAMarks = async (req, res) => {
  try {
    const icamarks = await ICAMarks.find();
    res.status(200).json(icamarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getICAMarksById = async (req, res) => {
  try {
    const { id } = req.params;
    const icamarks = await ICAMarks.findById(id);
    if (!icamarks) {
      return res.status(404).json({ message: 'ICAMarks not found' });
    }
    res.status(200).json(icamarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateICAMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const { regNo, ica01, ica02, ica03, totalMarks, averageMarks } = req.body;
    const updatedICAMarks = {
      regNo,
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
    const { id } = req.params;
    const icamarks = await ICAMarks.findByIdAndDelete(id);
    if (!icamarks) {
      return res.status(404).json({ message: 'ICAMarks not found' });
    }
    res.status(200).json({ message: 'ICAMarks deleted successfully', icamarks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
