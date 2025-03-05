const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (
  file,
  folder,
  height = null,
  quality = null
) => {
  try {
    const options = {
      folder,
      resource_type: "auto",
      ...(height && { height }),
      ...(quality && { quality }),
    };

    console.log("Uploading image with options:", options);

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);

    return result.secure_url; // ✅ Return only the URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload to Cloudinary failed");
  }
};
