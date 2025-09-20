// Express routes for contact messages

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");
const { protect, admin } = require("../middlewares/authMiddleware");

// @route POST /api/contact
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
    const newContact = await Contact.create({ name, email, message });
    // TODO: Add logic to email the spa owner using nodemailer
    res.status(201).json(newContact);
  })
);

// @route GET /api/contact
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.json(contacts);
  })
);

module.exports = router;
