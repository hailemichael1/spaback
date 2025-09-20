const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  images: [{ type: String }],
});

module.exports = mongoose.model("Service", serviceSchema);
