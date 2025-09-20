// Mongoose schema for a Membership plan

const mongoose = require("mongoose");

const membershipSchema = mongoose.Schema({
  planName: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in months
  benefits: [{ type: String }],
});

module.exports = mongoose.model("Membership", membershipSchema);
