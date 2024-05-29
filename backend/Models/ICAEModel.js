const mongoose = require('mongoose');

const icamarksSchema = new mongoose.Schema({
  course: { type: String },
  marks: [{
    regNo: { type: String },
    ica01: { type: Number },
    ica02: { type: Number },
    ica03: { type: Number },
    totalMarks: { type: Number },
    averageMarks: { type: Number }
  }]
});

const ICAMarks = mongoose.model('ICAMarks', icamarksSchema);

module.exports = ICAMarks;