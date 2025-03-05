const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "dand7pfot",
      api_key: "511849966491632",
      api_secret: "3lj5aQtF1PVnEVHnyEEEY4Vm_GA",
    });
  } catch (error) {
    console.log(error);
  }
};
