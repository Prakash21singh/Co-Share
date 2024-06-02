import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// const uploadOnCloudinay = async (localfilepath) => {
//   try {
//     if (!localfilepath) return null;
//     const upload = await cloudinary.uploader.upload(localfilepath, {
//       resource_type: "auto",
//     });
//     if (fs.existsSync(localfilepath)) {
//       fs.unlinkSync(localfilepath);
//     }
//     return upload;
//   } catch (error) {
//     console.log(error);
//     if (fs.existsSync(localfilepath)) {
//       fs.unlinkSync(localfilepath);
//     }
//     return null;
//   }
// };
const uploadOnCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

export { uploadOnCloudinary };
