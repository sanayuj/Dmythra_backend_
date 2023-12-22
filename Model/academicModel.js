const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
  videoName: {
    type: String,
    required: true,
  },
  videoDescription: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = new mongoose.model("AcademicDetails", academicSchema);
