const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://Prakash:${process.env.PASSWORD}@cluster0.gjxynzr.mongodb.net/Co-Share`
    );
    console.log(
      `MONGO DB CONNECTED !! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED", error);
    process.exit(1);
  }
}

module.exports = connectDb;
