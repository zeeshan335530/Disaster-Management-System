// src/models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  disasterType: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
