const user = require("../controllers/User/user.controller");
exports.routeConfig = function (app) {
  app.post("/api/v1/user/register", user.registerUser);
  app.post("/api/v1/user/login", user.loginUser);
  app.post("/api/v1/user/logout", user.logoutUser);
  app.post("/api/v1/user/refresh-token", user.refreshAccessToken);
};
