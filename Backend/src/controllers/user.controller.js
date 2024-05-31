import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const accessTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 24 * 60 * 60 * 1000, //  1 day
  domain: "https://co-share-client.vercel.app",
  path: "/",
};

const refreshTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  domain: "https://co-share-client.vercel.app",
  path: "/",
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
      //Use this format to return error
      return res.status(400).send({ message: "All Fields are required" });
    }

    let existedUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existedUser) {
      return res
        .status(401)
        .send({ message: "User already registered with this email/username" });
    }
    let avatarLocalPath = req.files?.avatar[0]?.buffer;

    let coverImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImg) &&
      req.files.coverImg.length > 0
    ) {
      coverImageLocalPath = req.files.coverImg[0].buffer;
    }

    if (!avatarLocalPath) {
      return res.status(400).send({ message: "Avatar is required" });
    }

    let avatar = await uploadOnCloudinary(avatarLocalPath);
    let coverImg = coverImageLocalPath
      ? await uploadOnCloudinary(coverImageLocalPath)
      : null;

    if (!avatar) {
      return res.status(501).send({ message: "Failed to upload Avatar!!" });
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
      return res
        .status(400)
        .send({ message: "Something went wrong while registering user" });
    }
    return res
      .status(201)
      .send(new ApiResponse(200, createdUser, "Signed Up successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

const loginUser = async function (req, res) {
  try {
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
      return res
        .status(400)
        .send({ message: "User does not exist in database" });
    }

    const ValidPassword = await user.isPasswordCorrect(password);

    if (!ValidPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    let { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    let loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -myUpload"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json({ accessToken, refreshToken, loggedInUser });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
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
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions)
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

function getUsersData(req, res) {
  User.findById(req.user._id)
    .select("-password -refreshToken")
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Something went wrong while getting user data  " });
    });
}

function getAllUsers(req, res) {
  User.find()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ message: error.message });
    });
}

export {
  refreshAccessToken,
  logoutUser,
  loginUser,
  registerUser,
  getUsersData,
  getAllUsers,
};
