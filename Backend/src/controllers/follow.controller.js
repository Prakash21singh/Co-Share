import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
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
  let user = await User.findById(_id).populate("following");
  if (!user) {
    throw new ApiError(404, "User does not found");
  }
  await user.res
    .status(200)
    .send(new ApiResponse(200, { following: user.followers }));
});

export const followUser = asyncHandler(async (req, res) => {
  let { _id: userOne } = req.user;
  let { id: userTwo } = req.body;
  try {
    let loggedInUser = await User.findById(userOne);
    let followingUser = await User.findById(userTwo);
    followingUser.followers.push(loggedInUser._id);
    await followingUser.save();

    loggedInUser.following.push(followingUser._id);
    await loggedInUser.save();
    return res
      .status(200)
      .json({ message: `Following ${followingUser.fullname}` });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

export const unfollowUser = asyncHandler(async (req, res) => {
  let { _id: userOne } = req.user;
  let { id: userTwo } = req.body;
  try {
    let loggedInUser = await User.findById(userOne);
    let unFollowingUser = await User.findById(userTwo);

    unFollowingUser.followers.pop(loggedInUser._id);
    loggedInUser.following.pop(loggedInUser._id);

    await unFollowingUser.save();
    await loggedInUser.save();

    return res
      .status(200)
      .json({ messsage: `Unfollowed ${unFollowingUser.fullname}` });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});
