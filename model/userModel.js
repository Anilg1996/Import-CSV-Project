const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true
  },
  Contact: {
    type: Number,
    required: true,
    unique: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  DateOfBirth: {
    type: String,
    required: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
