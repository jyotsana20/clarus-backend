const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    reasoning: { type: String },
    emotion: { type: String },
    outcome: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Decision", decisionSchema);