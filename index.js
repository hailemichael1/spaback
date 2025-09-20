const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
// API routes
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/memberships", membershipRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// // Serve frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
//   );
// }

// Serve frontend safely in production
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "../client/dist");

  // Serve static files
  app.use(express.static(clientDistPath));

  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    const indexPath = path.join(clientDistPath, "index.html");
    res.sendFile(indexPath, err => {
      if (err) {
        console.error("Error serving frontend:", err);
        res.status(500).send("Frontend not found");
      }
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
