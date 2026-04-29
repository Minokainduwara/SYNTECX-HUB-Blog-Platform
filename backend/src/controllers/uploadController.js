import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "blog_posts"
    });

    res.status(200).json({
      imageUrl: result.secure_url
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};