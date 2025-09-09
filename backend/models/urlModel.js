const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  shortcode: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_-]{3,30}$/, // validation
  },
  expiry: {
    type: Date,
    required: true,
  },
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      referrer: { type: String },
      ip: { type: String },
      location: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", urlSchema);
