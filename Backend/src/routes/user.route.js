import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/User/user.controller.js";

const routeConfig = function (app) {
  app.post("/api/v1/user/register", registerUser);
  app.post("/api/v1/user/login", loginUser);
  app.post("/api/v1/user/logout", logoutUser);
  app.post("/api/v1/user/refresh-token", refreshAccessToken);
};

export { routeConfig as User };
