const asyncHandler = require("express-async-handler");
const Booking = require("../models/Booking");

// @desc    Create a new booking (from public frontend)
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, service, date, notes } = req.body;

  // Simple validation
  if (!name || !email || !service || !date) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const booking = new Booking({
    name,
    email,
    phone,
    service,
    date,
    notes,
    status: "Pending", // All new bookings start as pending
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Get all bookings (for admin dashboard)
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({}).populate("service", "title price");
  res.json(bookings);
});

// @desc    Update a booking's status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.status = req.body.status || booking.status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    await booking.deleteOne();
    res.json({ message: "Booking removed" });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
};
