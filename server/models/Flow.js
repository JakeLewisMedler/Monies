const mongoose = require("mongoose");

const FlowSchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BudgetCategory"
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget"
    }
  },
  {
    timestamps: true
  }
);
FlowSchema.index({ "$**": "text" });
module.exports = mongoose.model("Flow", FlowSchema);
