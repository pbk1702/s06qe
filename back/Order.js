import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
  datetime: { type: Date },
  qty: { type: Number },
  name: { type: String },  
  phone: { type: String }, 
});

export default mongoose.model("Order", schema);