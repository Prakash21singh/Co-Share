import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getFollowers,
  followUser,
  getFollowing,
  unfollowUser,
} from "../controllers/follow.controller.js";
export const followRoute = function (app) {
  app.get("/app/v1/user/get-followers" /*Get followers */);
  app.get("/api/v1/user/get-following" /*Get all following */);
  app.post("/api/v1/user/follow", [verifyJwt, followUser]);
  app.post("/api/v1/user/unfollow", [verifyJwt, unfollowUser]);
  app.delete("/api/v1/user/remove-follower" /*Remove followers */);
};

// export { configRoute as followRoute };
