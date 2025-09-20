// Express routes for membership plans

// const express = require("express");
// const router = express.Router();
// const asyncHandler = require("express-async-handler");
// const Membership = require("../models/Membership");
// const { protect, admin } = require("../middlewares/authMiddleware");

// // @route GET /api/memberships
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const memberships = await Membership.find({});
//     res.json(memberships);
//   })
// );

// // Admin routes for memberships
// router.route("/").post(
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const newMembership = await Membership.create(req.body);
//     res.status(201).json(newMembership);
//   })
// );

// router.route("/:id").put(
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const updatedMembership = await Membership.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedMembership);
//   })
// );

// module.exports = router;

// Express routes for membership plans

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Membership = require("../models/Membership");
const { protect, admin } = require("../middlewares/authMiddleware");

// @route   GET /api/memberships
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const memberships = await Membership.find({});
    res.json(memberships);
  })
);

// @route   POST /api/memberships
// @access  Admin
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const newMembership = await Membership.create(req.body);
    res.status(201).json(newMembership);
  })
);

// @route   PUT /api/memberships/:id
// @access  Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json(updatedMembership);
  })
);

module.exports = router;
