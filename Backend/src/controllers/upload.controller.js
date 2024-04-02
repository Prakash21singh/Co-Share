import User from "../models/user.model.js";
import { Upload } from "../models/upload.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinay } from "../utils/cloudinary.js";
export const getAllUploads = asyncHandler(async function (req, res) {
  try {
    //Change this to req.user?._id in deployement state
    let userId = req.params.id;
    let user = await User.findById(userId).populate("myUpload");
    if (!user) {
      throw new ApiError(
        401,
        "Opps something went wrong in getting user's data"
      );
    }
    let userUploads = user.myUpload;
    return res.send(
      new ApiResponse(200, userUploads, "Successfully fetched some data")
    );
  } catch (error) {
    console.log("Error in Getting all uploads", error.message);
    return res.send(new ApiError(401, error.message, error));
  }
});

export const getUpload = asyncHandler(async function (req, res) {
  try {
    let uploadId = req.params.uploadId;
    let upload = await Upload.findById(uploadId);

    if (!upload) {
      throw new ApiError(500, "Cannot get any upload by this Id");
    }
    res
      .status(200)
      .send(new ApiResponse(200, upload, "Upload Found Successfully"));
  } catch (error) {
    console.log("Error in getting Upload", error.message);
    return res.send(new ApiError(401, error.message, error));
  }
});

export const createUpload = asyncHandler(async function (req, res) {
  try {
    //Change this in deployment state to req.user._id
    let userId = req.params.id;
    let { title, description } = req.body;
    if ([title, description].some((field) => field.trim() === "")) {
      throw new ApiError(401, "Title and description are required");
    }

    let uploadLocalPath = req.files?.Upload[0]?.path;

    if (!uploadLocalPath) {
      throw new ApiError(400, "Upload file is required");
    }

    let uploadFile = await uploadOnCloudinay(uploadLocalPath);
    if (!uploadFile) {
      throw new ApiError(500, "Something went wrong while uploading data");
    }

    let upload = await Upload.create({
      title,
      description,
      upload: uploadFile?.url,
    });
    let user = await User.findById(userId);

    user.myUpload.push(upload);
    await user.save();

    return res
      .status(200)
      .send(new ApiResponse(200, upload, "Data uploaded successfully"));
  } catch (error) {
    return res.status(400).send(error);
  }
});

export const updateUpload = asyncHandler(async (req, res) => {
  try {
    let uploadId = req.params.uploadId;
    let { title, description } = req.body;

    let upload = await Upload.findByIdAndUpdate(
      uploadId,
      {
        title,
        description,
      },
      { new: true }
    );

    if (req.files && req.files.NewUpload) {
      let uploadFilePath = req.files.NewUpload[0]?.path;
      let UploadedFile = await uploadOnCloudinay(uploadFilePath);
      upload.upload = UploadedFile.url;
    }
    await upload.save();

    res
      .status(200)
      .send(new ApiResponse(200, upload, "Your file is Updated successfully"));
  } catch (error) {
    res.status(400).send(new ApiError(400, error.message, error));
  }
});
