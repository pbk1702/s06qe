import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },  
  text: { type: String },
});

export default mongoose.model("Client", schema);