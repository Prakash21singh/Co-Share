import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
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
  let { email, username, password } = req.body;
  if (!email && !username) {
    throw new ApiError(401, "Email and username is required");
  }
  if (password.length < 8) {
    throw new ApiError(400, "Password should be eight digits long");
  }
  let user = await User.create({
    email: email,
    username: username,
    password: password,
  });

  let createdUser = await User.findById(user._id).select(
    "-password -myUpload -avatar -coverImg -followers -following"
  );

  if (!createdUser) {
    throw new ApiError(401, "User is not created");
  }

  res.send(new ApiResponse(200, createdUser, "Signed Up successfully"));
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
    "-password -refreshToken -avatar -myUpload"
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
