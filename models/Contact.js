// Mongoose schema for a Contact message

const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Contact", contactSchema);
