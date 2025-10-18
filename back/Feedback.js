import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  text: { type: String },
});

export default mongoose.model("Feedback", schema);