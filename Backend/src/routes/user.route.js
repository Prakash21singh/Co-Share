import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getUsersData,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const routeConfig = function (app) {
  app.get("/api/v1/user/data", verifyJwt, getUsersData);
  app.post(
    "/api/v1/user/register",
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
      {
        name: "coverImg",
        maxCount: 1,
      },
    ]),
    registerUser
  );
  app.post("/api/v1/user/login", loginUser);
  app.post("/api/v1/user/logout", verifyJwt, logoutUser);
  app.post("/api/v1/user/refresh-token", refreshAccessToken);
};

export { routeConfig as User };
