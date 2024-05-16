// ICAMarks.js
const mongoose = require('mongoose');

const icamarksSchema = new mongoose.Schema({
  regNo: { type: String,  },
  ica01: { type: Number, },
  ica02: { type: Number, },
  ica03: { type: Number,  },
  totalMarks: { type: Number,  },
  averageMarks: { type: Number, }
});

const ICAMarks = mongoose.model('ICAMarks', icamarksSchema);

module.exports = ICAMarks;
