const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    const { path, filename } = req.file;
    const newImage = new Image({ imageUrl: path, publicId: filename });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
