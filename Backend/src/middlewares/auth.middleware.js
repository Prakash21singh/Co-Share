import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
export const verifyJwt = async function (req, res, next) {
  try {
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(400).json({ message: "Token does not found" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -avatar -coverImg -followers -following -myUpload"
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
