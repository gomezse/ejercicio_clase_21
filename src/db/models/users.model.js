import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,        
    default:18
  },
  password: {
    type: String,
    required: true,
  },
});

export const usersModel = mongoose.model("Users", usersSchema);