import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinay = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    //upload the file on cloudinary
    const upload = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    console.log("File Uploaded successfully on cloudinary", upload.url);
    //file has been uploaded successfully
    return upload;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export { cloudinary };
