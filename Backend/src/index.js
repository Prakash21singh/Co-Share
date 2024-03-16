const { app } = require("./app.js");
const connectDb = require("./db/index.js");
require("dotenv").config({
  path: "../.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo db connection failed!!!`, err);
  });
