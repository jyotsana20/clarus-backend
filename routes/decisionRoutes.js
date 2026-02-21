const express = require("express");
const router = express.Router();
const {
  createDecision,
  getDecisions,
  getDecision,
  updateDecision,
  deleteDecision
} = require("../controllers/decisionController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createDecision);
router.get("/", protect, getDecisions);
router.get("/:id", protect, getDecision);
router.put("/:id", protect, updateDecision);
router.delete("/:id", protect, deleteDecision);

module.exports = router;