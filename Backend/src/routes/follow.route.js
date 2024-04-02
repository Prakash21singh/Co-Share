const configRoute = function (app) {
  app.get("/app/v1/user/get-followers" /*Get followers */);
  app.get("/api/v1/user/get-following" /*Get all following */);
  app.post("/api/v1/user/follow" /*follow someone*/);
  app.delete("/api/v1/user/unfollow" /*Unfollow Someone */);
  app.delete("/api/v1/user/remove-follower" /*Remove followers */);
};

export { configRoute as followRoute };
