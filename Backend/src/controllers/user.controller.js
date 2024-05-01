import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinay } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const option = {
  httpOnly: true,
  secure: true,
};

const generateAccessTokenAndRefreshToken = async function (userId) {
  let user = await User.findById(userId);
  let accessToken = user.generateAccessToken();
  let refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async function (req, res) {
  try {
    let { fullname, email, username, password } = req.body;
    if (
      [fullname, email, username, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All Fields are required");
    }

    let existedUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existedUser) {
      throw new ApiError(401, "User Already registered with this credential");
    }
    let avatarLocalPath = req.files?.avatar[0]?.path;

    let coverImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImg) &&
      req.files.coverImg.length > 0
    ) {
      coverImageLocalPath = req.files.coverImg[0].path;
    }

    if (!avatarLocalPath) {
      throw new ApiError("401", "Avatar is required");
    }

    let avatar = await uploadOnCloudinay(avatarLocalPath);
    let coverImg = await uploadOnCloudinay(coverImageLocalPath);

    if (!avatar) {
      throw new ApiError("401", "Avatar Uploading is failed");
    }

    let user = await User.create({
      fullname: fullname,
      username: username.toLowerCase(),
      email: email,
      password: password,
      avatar: avatar.url,
      coverImg: coverImg?.url || "",
    });

    let createdUser = await User.findById(user._id).select(
      "-password -myUpload -followers -following -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Somethig went wrong while registering user");
    }

    res
      .status(201)
      .send(new ApiResponse(200, createdUser, "Signed Up successfully"));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const loginUser = async function (req, res) {
  let { identification, password } = req.body;

  if (!identification) {
    throw new ApiError(
      401,
      "Email or username is required",
      "Please enter email or username for sign in"
    );
  }

  let user = await User.findOne({
    $or: [{ email: identification }, { username: identification }],
  });

  if (!user) {
    res.status(200).json({ message: "User does not exist in database" });
  }

  const ValidPassword = await user.isPasswordCorrect(password);

  if (!ValidPassword) {
    res.status(400).json({ message: "Invalid user credentials" });
  }

  let { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    user._id
  );

  let loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -avatar -myUpload -coverImg"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json({ accessToken, refreshToken, loggedInUser });
};

const logoutUser = function (req, res) {
  User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged Out"));
};

const refreshAccessToken = function (req, res) {
  let incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(400).json({ message: "Unauthorized request" });
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = User.findById(decodedToken?._id);

  if (!user) {
    return res.status(400).json({ message: "Token expired or used" });
  }

  const { accessToken, refreshToken: newRefreshToken } =
    generateAccessTokenAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", newRefreshToken)
    .json({ data: newRefreshToken, accessToken }, "Access Token Refreshed");
};

export { refreshAccessToken, logoutUser, loginUser, registerUser };
