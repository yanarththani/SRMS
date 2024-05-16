// models/FinalMark.js
const mongoose = require('mongoose');

const FinalMarkSchema = new mongoose.Schema({
  regNo: { type: String },
  q1: { type: Number },
  q2: { type: Number },
  q3: { type: Number },
  q4: { type: Number },
  q5: { type: Number },
  totalMarks: { type: Number },
  averageMarks: { type: Number }
});

const FinalMark = mongoose.model('FinalMark', FinalMarkSchema);

module.exports = FinalMark;
