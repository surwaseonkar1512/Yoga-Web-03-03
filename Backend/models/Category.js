const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Auto-generate slug before saving
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
