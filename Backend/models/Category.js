const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    heading: { type: String, required: true },
    paragraph: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
