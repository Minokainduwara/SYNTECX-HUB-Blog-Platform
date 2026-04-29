import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {

    console.log("FILES:", req.files);

    const file = req.files?.image;

    if (!file) {
      return res.status(400).json({
        message: "No image file provided"
      });
    }

    if (!file.tempFilePath) {
      return res.status(400).json({
        message: "tempFilePath missing (check fileUpload config)"
      });
    }

    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "blog_posts"
      }
    );

    return res.status(200).json({
      imageUrl: result.secure_url
    });

  } catch (error) {

    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};