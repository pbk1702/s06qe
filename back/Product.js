import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  category: { type: String }, 
  tags: { type: String },
  price: { type: Number },
  text: { type: String },
  image: { type: String },
});

export default mongoose.model("Product", schema);