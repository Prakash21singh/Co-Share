import { app } from "./app.js";
import { connectDb } from "./db/index.js";
import { User } from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
User(app);

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo db connection failed!!!`, err);
  });
