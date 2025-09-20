const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(createBooking) // This is a public route for customers
  .get(protect, admin, getBookings); // This is a protected route for admins

router
  .route("/:id")
  .put(protect, admin, updateBookingStatus)
  .delete(protect, admin, deleteBooking);

module.exports = router;
