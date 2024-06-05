import mongoose from "mongoose";


const bookesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true},
  },
  
);

const bookesModel = mongoose.model('Bookes', bookesSchema)

export {bookesModel as Book}