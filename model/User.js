const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  resume: {
    data:Buffer,
    contentType:String,
    filename:String,
    size:String,
    encoding:String,
  },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
