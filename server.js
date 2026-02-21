const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const decisionRoutes = require("./routes/decisionRoutes"); // Import router
const protect = require("./middleware/authMiddleware");     // Only needed if using directly

const app = express(); // MUST be first

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/decisions", decisionRoutes); // ✅ No extra protect here

// Protected route example
app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

// Test route
app.get("/", (req, res) => res.send("Clarus API Running"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));