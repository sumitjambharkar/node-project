const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Date,
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("Countries", countriesSchema);
