const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

exports.verifyJwt = function (req, res, next) {
  try {
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(400).json({ message: "Token does not found" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      res.status(400).json({ message: "Invalid access token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
