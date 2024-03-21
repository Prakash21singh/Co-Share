import { validateUserLogin, validateUserRegister } from "./user.validator.js";
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

const registerUser = function (req, res) {
  let { email, username, password } = req.body;
  validate.validateUserRegister(email, username, password);
  User.create({
    email: email,
    username: username,
    password: password,
  })
    .then((user) => {
      user: user.toJSON();
      delete user.password;
      delete user.refreshToken;
      delete user.avatar;
      return res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message || "Invalid registration" });
    });
};

const loginUser = async function (req, res) {
  let { email, username, password } = req.body;
  validate.validateUserLogin(email, username, password);
  let user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    res.status(200).json({ message: "User does not exist in database" });
  }

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    res.status(400).json({ message: "Invalid user credentials" });
  }

  let { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(
    user._id
  );

  let loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -avatar -myUpload"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json({ user: accessToken, refreshToken, loggedInUser });
};

const logoutUser = function (req, res) {
  //user ko find karo
  //req me to user set hai waha se cookie clear karo
  //and database me findbyid karke ek query lelo and refreshtoken delete kardo waaha

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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
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
