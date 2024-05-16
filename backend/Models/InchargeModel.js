const mongoose = require('mongoose');


const inChargeSchema = new mongoose.Schema({
  lectureName:String,
  username : String,
  password : String,
  academicYear:String,
  semester:String,
  subject:String,

});

const inCharge = mongoose.model('inCharge', inChargeSchema );

module.exports = inCharge;