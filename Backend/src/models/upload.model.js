import mongoose, { mongo } from "mongoose";

const uploadSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  upload: {
    type: String,
  },
});

export const Upload = mongoose.model("Upload", uploadSchema);
