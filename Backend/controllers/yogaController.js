const Yoga = require("../models/Yoga");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

// ✅ Create a new Yoga Pose
exports.createYoga = async (req, res) => {
  try {
    let { category, name, slug, subHeading, mainParagraph, totalTimeToPractice, totalRepetitions, steps, videoLink, benefits } = req.body;
    const imageFile = req.files?.image;

    if (!category || !name || !slug || !subHeading || !mainParagraph || !totalTimeToPractice || !totalRepetitions || !steps || !videoLink || !benefits || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields including an image are required",
      });
    }

    // ✅ Upload main image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(imageFile, "yoga_poses");
    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // ✅ Create and save Yoga pose
    const newYoga = await Yoga.create({
      category,
      name,
      slug,
      mainImage: imageUrl,
      subHeading,
      mainParagraph,
      totalTimeToPractice,
      totalRepetitions,
      steps: JSON.parse(steps), // Ensure steps are properly formatted
      videoLink,
      benefits: JSON.parse(benefits),
    });

    res.status(201).json({
      success: true,
      data: newYoga,
      message: "Yoga pose created successfully",
    });
  } catch (error) {
    console.error("Error creating yoga pose:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create yoga pose",
      error: error.message,
    });
  }
};

// ✅ Get all Yoga Poses
exports.getAllYoga = async (req, res) => {
  try {
    const yogas = await Yoga.find().populate("category", "name heading");
    if (!yogas.length) {
      return res.status(404).json({
        success: false,
        message: "No yoga poses found",
      });
    }
    res.status(200).json({
      success: true,
      data: yogas,
    });
  } catch (error) {
    console.error("Error fetching yoga poses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch yoga poses",
      error: error.message,
    });
  }
};

// ✅ Get a Single Yoga Pose by Slug
exports.getYogaBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const yoga = await Yoga.findOne({ slug }).populate("category", "name heading");

    if (!yoga) {
      return res.status(404).json({
        success: false,
        message: "Yoga pose not found",
      });
    }

    res.status(200).json({
      success: true,
      data: yoga,
    });
  } catch (error) {
    console.error("Error fetching yoga pose:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch yoga pose",
      error: error.message,
    });
  }
};

// ✅ Update a Yoga Pose
exports.updateYoga = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, slug, subHeading, mainParagraph, totalTimeToPractice, totalRepetitions, steps, videoLink, benefits, category } = req.body;
    const imageFile = req.files?.image;

    const yoga = await Yoga.findById(id);
    if (!yoga) {
      return res.status(404).json({
        success: false,
        message: "Yoga pose not found",
      });
    }

    // ✅ If there's a new image, upload it
    if (imageFile) {
      const imageUrl = await uploadImageToCloudinary(imageFile, "yoga_poses");
      if (imageUrl) yoga.mainImage = imageUrl;
    }

    // ✅ Update fields
    yoga.name = name || yoga.name;
    yoga.slug = slug || yoga.slug;
    yoga.subHeading = subHeading || yoga.subHeading;
    yoga.mainParagraph = mainParagraph || yoga.mainParagraph;
    yoga.totalTimeToPractice = totalTimeToPractice || yoga.totalTimeToPractice;
    yoga.totalRepetitions = totalRepetitions || yoga.totalRepetitions;
    yoga.steps = steps ? JSON.parse(steps) : yoga.steps;
    yoga.videoLink = videoLink || yoga.videoLink;
    yoga.benefits = benefits ? JSON.parse(benefits) : yoga.benefits;
    yoga.category = category || yoga.category;

    await yoga.save();

    res.status(200).json({
      success: true,
      data: yoga,
      message: "Yoga pose updated successfully",
    });
  } catch (error) {
    console.error("Error updating yoga pose:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update yoga pose",
      error: error.message,
    });
  }
};

// ✅ Delete a Yoga Pose
exports.deleteYoga = async (req, res) => {
  try {
    const { id } = req.params;

    const yoga = await Yoga.findById(id);
    if (!yoga) {
      return res.status(404).json({
        success: false,
        message: "Yoga pose not found",
      });
    }

    // ✅ Delete main image from Cloudinary
    const imagePublicId = yoga.mainImage.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`yoga_poses/${imagePublicId}`);

    // ✅ Delete Yoga from DB
    await Yoga.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Yoga pose deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting yoga pose:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete yoga pose",
      error: error.message,
    });
  }
};
