const mongoose = require("mongoose");

const YogaSchema = new mongoose.Schema({
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Category", // Reference to Yoga Category
    // required: true,
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  mainImage: {
    type: String, // Cloudinary or other image URL
    required: true,
  },
  subHeading: {
    type: String,
    required: true,
  },
  mainParagraph: {
    type: String,
    required: true,
  },
  totalTimeToPractice: {
    type: String, // e.g., "15 minutes"
    required: true,
  },
  totalRepetitions: {
    type: String, // e.g., "3 sets of 10 reps"
    required: true,
  },
  steps: [
    {
      stepName: { type: String, required: true }, // Step 1, Step 2, etc.
      title: { type: String, required: true }, // "Mountain Pose"
      description: { type: String, required: true },
      image: { type: String }, // Step image
    },
  ],
  videoLink: {
    type: String, // YouTube or other video URL
  },
  benefits: {
    type: [String], // Array of benefits
    required: true,
  },
});

module.exports = mongoose.model("Yoga", YogaSchema);
