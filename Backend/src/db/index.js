import mongoose from "mongoose";
async function connectDb() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `MONGO DB CONNECTED !! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED", error);
    process.exit(1);
  }
}

export { connectDb };
