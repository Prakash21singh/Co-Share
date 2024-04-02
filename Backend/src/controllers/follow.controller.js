import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import User from "../models/user.model";
export const getFollowers = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  if (!_id) {
    throw new ApiError(401, "Looks like user is not authorised");
  }
  let user = await User.findById(_id).populate("followers");
  if (!user) {
    throw new ApiError(404, "User does not found");
  }
  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        { followers: user.followers },
        "Data fetched successfully"
      )
    );
});

export const getFollowing = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  if (!_id) {
    throw new ApiError(401, "Looks like user is not authorised");
  }
  let user = await User.findById(_id).populate("following");
  if (!user) {
    throw new ApiError(404, "User does not found");
  }
  await user.res
    .status(200)
    .send(new ApiResponse(200, { following: user.followers }));
});
