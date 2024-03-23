import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const routeConfig = function (app) {
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
  app.post("/api/v1/user/logout", logoutUser);
  app.post("/api/v1/user/refresh-token", refreshAccessToken);
};

export { routeConfig as User };
