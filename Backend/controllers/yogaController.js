const Yoga = require("../models/Yoga");
const Category = require("../models/Category");

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

// ✅ Create a new Yoga Pose
exports.createYoga = async (req, res) => {
  try {
    let {
      category,
      name,
      slug,
      subHeading,
      mainParagraph,
      totalTimeToPractice,
      totalRepetitions,
      steps,
      videoLink,
      benefits,
    } = req.body;

    // ✅ Extract image files
    const mainImageFile = req.files?.mainImage;
    const infoSectionImageFile = req.files?.infoSectionImage;
    const benefitImageFile = req.files?.benefitImage;

    // ✅ Check for required fields
    if (
      !category ||
      !name ||
      !slug ||
      !subHeading ||
      !mainParagraph ||
      !totalTimeToPractice ||
      !totalRepetitions ||
      !steps ||
      !videoLink ||
      !benefits ||
      !mainImageFile ||
      !infoSectionImageFile ||
      !benefitImageFile
    ) {
      return res.status(400).json({
        success: false,
        data: req.body,
        message: "All fields including all images are required",
      });
    }

    const mainImageUrl = await uploadImageToCloudinary(
      mainImageFile,
      "yoga_poses"
    );
    const infoSectionImageUrl = await uploadImageToCloudinary(
      infoSectionImageFile,
      "yoga_poses"
    );
    const benefitImageUrl = await uploadImageToCloudinary(
      benefitImageFile,
      "yoga_poses"
    );

    if (!mainImageUrl || !infoSectionImageUrl || !benefitImageUrl) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // ✅ Parse steps and benefits
    const formattedSteps =
      typeof steps === "string" ? JSON.parse(steps) : steps;
    const formattedBenefits =
      typeof benefits === "string" ? JSON.parse(benefits) : benefits;

    // ✅ Create and save Yoga pose
    const newYoga = await Yoga.create({
      category,
      name,
      slug,
      mainImage: mainImageUrl,
      infoSectionImage: infoSectionImageUrl,
      benefitImage: benefitImageUrl,
      subHeading,
      mainParagraph,
      totalTimeToPractice,
      totalRepetitions,
      steps: formattedSteps,
      videoLink,
      benefits: formattedBenefits,
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
    const yoga = await Yoga.findOne({ slug }).populate(
      "category",
      "name heading"
    );

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
    let {
      name,
      slug,
      subHeading,
      mainParagraph,
      totalTimeToPractice,
      totalRepetitions,
      steps,
      videoLink,
      benefits,
      category,
    } = req.body;

    // ✅ Extract new image files (if provided)
    const mainImageFile = req.files?.mainImage;
    const infoSectionImageFile = req.files?.infoSectionImage;
    const benefitImageFile = req.files?.benefitImage;

    const yoga = await Yoga.findById(id);
    if (!yoga) {
      return res.status(404).json({
        success: false,
        message: "Yoga pose not found",
      });
    }

    // ✅ Upload new images if provided
    if (mainImageFile) {
      const mainImageUrl = await uploadImageToCloudinary(
        mainImageFile,
        "yoga_poses"
      );
      if (mainImageUrl) yoga.mainImage = mainImageUrl;
    }
    if (infoSectionImageFile) {
      const infoSectionImageUrl = await uploadImageToCloudinary(
        infoSectionImageFile,
        "yoga_poses"
      );
      if (infoSectionImageUrl) yoga.infoSectionImage = infoSectionImageUrl;
    }
    if (benefitImageFile) {
      const benefitImageUrl = await uploadImageToCloudinary(
        benefitImageFile,
        "yoga_poses"
      );
      if (benefitImageUrl) yoga.benefitImage = benefitImageUrl;
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

    // ✅ Extract public IDs for images
    const mainImagePublicId = yoga?.mainImage
      ?.split("/")
      ?.pop?.()
      ?.split(".")?.[0];
    const infoSectionImagePublicId = yoga.infoSectionImage
      .split("/")
      .pop()
      .split(".")[0];
    const benefitImagePublicId = yoga.benefitImage
      .split("/")
      .pop()
      .split(".")[0];

    // ✅ Delete images from Cloudinary
    await cloudinary.uploader.destroy(`yoga_poses/${mainImagePublicId}`);
    await cloudinary.uploader.destroy(`yoga_poses/${infoSectionImagePublicId}`);
    await cloudinary.uploader.destroy(`yoga_poses/${benefitImagePublicId}`);

    // ✅ Delete Yoga pose from DB
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

exports.getYogaByCategory = async (req, res) => {
  try {
    const { categoryIdOrSlug } = req.params;

    let category;

    // ✅ Check if the input is an ID or slug and find the category
    if (categoryIdOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's a valid ObjectId (MongoDB ID)
      category = await Category.findById(categoryIdOrSlug);
    } else {
      // Otherwise, treat it as a slug
      category = await Category.findOne({ slug: categoryIdOrSlug });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: [],
      });
    }

    // ✅ Fetch all yoga poses under this category
    const yogas = await Yoga.find({ category: category._id }).populate(
      "category",
      "name heading"
    );

    if (!yogas.length) {
      return res.status(200).json({
        success: true,
        message: "No yoga poses found for this category",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: yogas,
    });
  } catch (error) {
    console.error("Error fetching yoga poses by category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch yoga poses by category",
      error: error.message,
    });
  }
};
