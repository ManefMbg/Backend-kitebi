import { User } from "../models/User.js";
import bcrypt from "bcryptjs";


export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const data = await User.deleteOne({ _id: id });
  res.send({
    success: true,
    message: "data deleted successfully!!",
    data: data,
  });
};


export const getUsers = async (req, res) => {
  const data = await User.find();
  res.json({ success: true, data: data });
}


export const getOneUser = async (req, res) => {
  const id = req.params.id;
  const data = await User.findById({ _id: id });
  res.send({
    success: true,
    message: "User found successfully!!",
    data: data,
  });
};