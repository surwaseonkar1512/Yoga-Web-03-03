const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
  weight: {
    type: Number, // Weight in kg
  },
  height: {
    type: Number, // Height in cm
  },
  savedYogaPoses: [
    {
      type: Object,
      ref: "Yoga", // Reference to Yoga Pose collection
    },
  ],
  savedRecipes: [
    {
      type: Object,
      ref: "Recipe", // Reference to Recipe collection
    },
  ],
  generals: [
    {
      title: { type: String, trim: true },
      content: { type: String, trim: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
