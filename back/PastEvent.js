import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
  category: { type: Number }, 
  date: { type: Date },
  name: { type: String },  
  text: { type: String }, 
  images: [],
});