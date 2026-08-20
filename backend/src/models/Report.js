import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  disasterType: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  latitude: {
    type: Number,
    default: null,
  },

  longitude: {
    type: Number,
    default: null,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);