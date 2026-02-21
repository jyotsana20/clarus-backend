const Decision = require("../models/Decision");

// Create a new decision
exports.createDecision = async (req, res) => {
  try {
    const { title, description, reasoning, emotion, outcome } = req.body;
    const decision = await Decision.create({
      user: req.user._id,
      title,
      description,
      reasoning,
      emotion,
      outcome
    });
    res.status(201).json(decision);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all decisions for logged-in user
exports.getDecisions = async (req, res) => {
  try {
    const decisions = await Decision.find({ user: req.user._id });
    res.json(decisions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a single decision
exports.getDecision = async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id);
    if (!decision || decision.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Decision not found" });
    }
    res.json(decision);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a decision
exports.updateDecision = async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id);
    if (!decision || decision.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Decision not found" });
    }
    Object.assign(decision, req.body);
    await decision.save();
    res.json(decision);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a decision
exports.deleteDecision = async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id);
    if (!decision || decision.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Decision not found" });
    }
    await decision.remove();
    res.json({ message: "Decision deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};