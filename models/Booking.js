// Mongoose schema for a Booking

const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, default: 'Pending' } // 'Pending', 'Confirmed', 'Cancelled'
});

module.exports = mongoose.model('Booking', bookingSchema);